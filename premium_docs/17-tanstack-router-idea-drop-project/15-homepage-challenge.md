# Homepage Challenge

So we have our navigation and the ideas and idea details page. What I want you to try on your own is to create a homepage with the latest 3 ideas from the API. Here is the HTML that you can use in the JSX. Of course, you will make this dynamic and use the data from the API.

```tsx
<div className='flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-blue-600'>
  <div className='flex flex-col items-start gap-4'>
    <Lightbulb className='w-16 h-16 text-yellow-400' />
    <h1 className='text-4xl font-bold text-gray-800'>Welcome to IdeaDrop</h1>
    <p className='text-gray-600 max-w-xs'>
      Share, explore, and build on the best startup ideas and side hustles.
    </p>
  </div>

  <section className='flex-1'>
    <h2 className='text-2xl font-semibold mb-4 text-gray-800'>Latest Ideas</h2>
    <ul className='space-y-6'>
      <li className='border border-gray-300 rounded-lg shadow p-4 bg-white'>
        <h3 className='text-lg font-bold text-gray-900'>Idea Title 1</h3>
        <p className='text-gray-600 mb-2'>
          This will be the summary for idea 1...
        </p>
        <a href='#' className='text-blue-600 hover:underline'>
          Read more →
        </a>
      </li>
      <li className='border border-gray-300 rounded-lg shadow p-4 bg-white'>
        <h3 className='text-lg font-bold text-gray-900'>Idea Title 2</h3>
        <p className='text-gray-600 mb-2'>
          This will be the summary for idea 1...
        </p>
        <a href='#' className='text-blue-600 hover:underline'>
          Read more →
        </a>
      </li>
      <li className='border border-gray-300 rounded-lg shadow p-4 bg-white'>
        <h3 className='text-lg font-bold text-gray-900'>Idea Title 3</h3>
        <p className='text-gray-600 mb-2'>
          This will be the summary for idea 1...
        </p>
        <a href='#' className='text-blue-600 hover:underline'>
          Read more →
        </a>
      </li>
    </ul>

    <div className='mt-6'>
      <a
        href='/ideas'
        className='w-full text-center inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition'
      >
        View All Ideas
      </a>
    </div>
  </section>
</div>
```

For a bonus, move the functions that interact with the JSON Placeholder API to a separate file. You can create a `src/api` folder and create a `ideas.ts` file in there. You can then import the functions from there. Because you are basically doing the same thing here that you did in the ideas page.

## Challenge Solution

Ok, so here is the solution.

Let's start with the bonus, which was moving the api functions to their own file.

Create a new file at `src/api/ideas.ts` and add the following code:

```ts
import api from '@/lib/axios';
import type { Idea } from '@/types';

// Get all ideas
export const fetchIdeas = async (): Promise<Idea[]> => {
  const response = await api.get('/ideas');
  return response.data;
};

// Get single idea
export const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const response = await api.get(`/ideas/${ideaId}`);
  return response.data;
};
```

Import the `fetchIdea` into the `src/routes/ideas/[ideaId].tsx` file and delete the one that is there and you should be all set there:

```tsx
import { fetchIdea } from '@/api/ideas';
```

You can also delete the `fetchIdeas` function there as well as the axios and type imports. We are not using them anymore.

Do the same with the `fetchIdeas` function in the `src/routes/ideas/index.tsx` file:

```tsx
import { fetchIdeas } from '@/api/ideas';
```

You can delete the type imports for the `Idea` type in the `src/routes/ideas/index.tsx` file as well. We are not using them anymore.

## Homepage

Now import the following into the `src/routes/index.tsx` file:

```tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import type { Idea } from '@/types';
import { fetchIdeas } from '@/api/ideas';
import { Lightbulb } from 'lucide-react';
```

## Create Query Options & Loader

Create the query options and add them to the `Route` object loader:

```tsx
const ideasQueryOptions = queryOptions({
  queryKey: ['ideas'],
  queryFn: fetchIdeas,
});

export const Route = createFileRoute('/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(ideasQueryOptions),
  component: HomePage,
});
```

Now get the data from the loader and display it in the `HomePage` component and limit it to 3 using the `slice` method:

```tsx
function HomePage() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions);
  const latestIdeas = ideas.slice(0, 3);

  return (
    <div className='flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-blue-600'>
      <div className='flex flex-col items-start gap-4'>
        <Lightbulb className='w-16 h-16 text-yellow-400' />
        <h1 className='text-4xl font-bold text-gray-800'>
          Welcome to IdeaDrop
        </h1>
        <p className='text-gray-600 max-w-xs'>
          Share, explore, and build on the best startup ideas and side hustles.
        </p>
      </div>

      <section className='flex-1'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
          Latest Ideas
        </h2>
        <ul className='space-y-6'>
          {latestIdeas.map((idea: Idea) => (
            <li
              key={idea.id}
              className='border border-gray-300 rounded-lg shadow p-4 bg-white'
            >
              <h3 className='text-lg font-bold text-gray-900'>{idea.title}</h3>
              <p className='text-gray-600 mb-2'>{idea.summary}</p>
              <Link
                to='/ideas/$ideaId'
                params={{ ideaId: idea.id.toString() }}
                className='text-blue-600 hover:underline'
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>

        <div className='mt-6'>
          <Link
            to='/ideas'
            className='w-full text-center inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition'
          >
            View All Ideas
          </Link>
        </div>
      </section>
    </div>
  );
}
```

We used a list to display the ideas. We are using the `map` method to loop through the ideas and display them. We are also using the `Link` component from `@tanstack/react-router` to link to the idea details page.

## Limit at the API Level

This works, however we are still making a request for all the ideas and then slicing them. This is not ideal. We can limit the number of ideas at the API level. Of course your API needs to support this. The JSON Server does support this. You can add a `_limit` query parameter to the URL to limit the number of ideas returned.

We are using the `fetchIdeas` for both the homepage and the ideas page, so we need to make it more dynamic. We can add an optional `_limit` parameter to the function. If it is not provided, we will just return all the ideas.

```ts
// Get all ideas with optional limit
export const fetchIdeas = async (limit?: number): Promise<Idea[]> => {
  const response = await api.get('/ideas', {
    params: limit ? { _limit: limit } : {},
  });
  return response.data;
};
```

Now we can pass the limit to the `fetchIdeas` function in the homepage. We can also pass the limit to the ideas page as well. This way we are only fetching the ideas that we need.

```tsx
const ideasQueryOptions = queryOptions({
  queryKey: ['ideas', { limit: 3 }],
  queryFn: () => fetchIdeas(3),
});
```

You can now get rid of the `slice` method in the `HomePage` component. The API will only return 3 ideas now.

Here is the full code for the `src/routes/index.tsx` file:

```tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import type { Idea } from '@/types';
import { fetchIdeas } from '@/api/ideas';
import { Lightbulb } from 'lucide-react';

const ideasQueryOptions = queryOptions({
  queryKey: ['ideas', { limit: 3 }],
  queryFn: () => fetchIdeas(3),
});

export const Route = createFileRoute('/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(ideasQueryOptions),
  component: HomePage,
});

function HomePage() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions);

  return (
    <div className='flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-blue-600'>
      <div className='flex flex-col items-start gap-4'>
        <Lightbulb className='w-16 h-16 text-yellow-400' />
        <h1 className='text-4xl font-bold text-gray-800'>
          Welcome to IdeaDrop
        </h1>
        <p className='text-gray-600 max-w-xs'>
          Share, explore, and build on the best startup ideas and side hustles.
        </p>
      </div>

      <section className='flex-1'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
          Latest Ideas
        </h2>
        <ul className='space-y-6'>
          {ideas.map((idea: Idea) => (
            <li
              key={idea.id}
              className='border border-gray-300 rounded-lg shadow p-4 bg-white'
            >
              <h3 className='text-lg font-bold text-gray-900'>{idea.title}</h3>
              <p className='text-gray-600 mb-2'>{idea.summary}</p>
              <Link
                to='/ideas/$ideaId'
                params={{ ideaId: idea.id.toString() }}
                className='text-blue-600 hover:underline'
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>

        <div className='mt-6'>
          <Link
            to='/ideas'
            className='w-full text-center inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition'
          >
            View All Ideas
          </Link>
        </div>
      </section>
    </div>
  );
}
```
