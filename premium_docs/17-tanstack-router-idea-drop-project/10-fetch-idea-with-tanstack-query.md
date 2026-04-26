# Fetch Idea With TanStack Query

We have TanStack Query set up and the `queryClient` is passed to the router context. Now we can use the `queryClient` in any route loader.

Open the `src/routes/ideas/$ideaId.tsx` file and import the the following:

```tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
```

`queryOptions()` is a helper function that lets you define your query config in a standalone, type-safe, reusable way. In the Github Finder project, we wrote everything inline inside useQuery(...), which is ok, but we can use `queryOptions` to define our query logic separately, then pass it to a query hook (like useSuspenseQuery or useQuery).

`useSuspenseQuery()` is a version of useQuery() that uses React query under the hood. You saw in the Github project, we used `useQuery`, which gave us a loading state. With `useSuspenseQuery`, we dont get a loading state because React Suspense suspends the response until the component is done loading. So it lets you build a cleaner UI without handling loading/error states manually. If you wanted to handle loading manually, you could just use the `useQuery` hook like we did with Github Finder.

## Create The options

Let's put our query options in a function to keep the code clean. Add the following code below the `fetchIdeas` function:

```tsx
const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdea(ideaId),
  });
```

Here, we are creating a function that takes the `ideaId` and returns the query options for the idea. The `queryKey` is an array that contains the query key of 'idea' and the `ideaId`. The `queryFn` is a function that fetches the idea data. We have that set to the `fetchIdea` function we created earlier.

Now in the loader, we can pass in the `queryClient` from the context that we set in the last lesson. We can then use that to get the query data.

```tsx
 loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
```

We are using the `ensureQueryData` method to ensure that the query data is available. This will fetch the data if it is not already in the cache. If the data is already in the cache, it will return the cached data. We then pass that the `ideaQueryOptions` function which calls the `fetchIdea` function to get the data.
This will ensure that the data is always up to date and we are not making unnecessary network requests.

Now, down in the component, we can use the `useSuspenseQuery` hook to get the data. This will automatically suspend the component until the data is ready.

```tsx
function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  return (
    <div className='p-4'>
      <Link to='/ideas' className='text-blue-500 underline block mb-4'>
        Back to Ideas
      </Link>
      <h2 className='text-2xl font-bold'>{idea.title}</h2>
      <p className='mt-2'>{idea.description}</p>
    </div>
  );
}
```

You should now see the idea details page with the idea title and body. The data is being fetched using TanStack Query and is being cached. We are renaming `data` to `idea`.

If you go back to the ideas list and then back to the idea details page, the data is already in the cache and is not being fetched again.

## Idea Type

We should create a type for ideas. Create a new file at`src/types.ts` and add the following code:

```tsx
export interface Idea {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  createdAt: string;
  user: string;
}
```

Bring it into the `src/routes/ideas/$ideaId.tsx` file and use it in the `IdeaDetailsPage` component:

```tsx
import type { Idea } from '@/types';
```

Then, in the `fetchIdea` function, we can use the `Idea` type to type the response:

```tsx
const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const res = await fetch(`/api/ideas/${ideaId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
```

You should be able to see the idea details page with the idea title and description. The data is being fetched using TanStack Query and is being cached. If you go back to the ideas list and then back to the idea details page, the data is already in the cache and is not being fetched again.

In the next lesson, we will create the idea list page.
