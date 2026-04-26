# Fetching All Ideas

Let's fetch the ideas in the `src/routes/ideas/index.tsx` file. Add the following imports

```tsx
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import type { Idea } from '@/types';
```

Let's create the actual function that makes the request to fetch all ideas from the API. Add the following code:

```tsx
const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await api.get('/ideas');
  return res.data;
};
```

## Query Options

Then, create the query options for the ideas:

```tsx
const ideaQueryOptions = () =>
  queryOptions({
    queryKey: ['ideas'],
    queryFn: () => fetchIdeas(),
  });
```

## The Loader

Add the loader, which will takes the `queryClient` from the context and use it to fetch the ideas:

```tsx
export const Route = createFileRoute('/ideas/')({
  component: IdeasPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions());
  },
});
```

Now get the data from the loader and use the `useSuspenseQuery` hook to get the data:

```tsx
function IdeasPage() {
  const { data: ideas } = useSuspenseQuery(ideaQueryOptions());

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Ideas</h1>
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className='border border-gray-300 p-4 rounded shadow bg-white flex flex-col justify-between'
          >
            <div>
              <h2 className='text-lg font-semibold'>{idea.title}</h2>
              <p className='text-gray-700 mt-2'>{idea.summary}</p>
            </div>

            <Link
              to='/ideas/$ideaId'
              params={{ ideaId: idea.id.toString() }}
              className='text-center mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition'
            >
              View Idea
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Now you should see all ideas and have a button to go to the details page.
