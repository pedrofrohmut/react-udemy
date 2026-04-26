# TanStack Router Loaders

If you have been following along with the course and you did the previous idea where we used React Router in framework mode, then you learned how to use React Router loaders to load data. TanStack Router has a similar concept and they are also called loaders.

Route loader functions are called when a route match is loaded. They are called with a single parameter which is an object containing a lot of helpful properties. Let's look at an example of a route loader function:

Open the `routes/ideas/$ideaId.tsx` file and add the following code:

```tsx
export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({ params }) => {
    return params.ideaId;
  },
});

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  return <div>Idea {ideaId}</div>;
}
```

We create the loader in the route definition. The loader is an async function that returns the data we want to load. The loader function is called when the route is matched. The `params` object contains the route parameters. In this case, we are using the `$ideaId` parameter from the route.

We can then use the `Route.useParams` hook to get the route parameters in the component.

## Client Side Loaders

With React Router, the loaders ran on the server-side by default. With TanStack, they run on the client. So you don't want any sensitive or secret information in these. If you were to use the TanStack Start framework, which can be server-rendered, you could create a server function and put your secret variables there, but you don't want to expose them to the client and loaders run client side.

## Loading Data

Let's use the loader to load some data. We will use the `useLoaderData` hook to get the idea data from the loader.

In the `routes/ideas/$ideaId.tsx` file, add the following code:

```tsx
import { createFileRoute } from '@tanstack/react-router';

const fetchIdea = async (ideaId: string) => {
  const res = await fetch(`http://localhost:5000/ideas/${ideaId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({ params }) => {
    return fetchIdea(params.ideaId);
  },
});

function IdeaDetailsPage() {
  const idea = Route.useLoaderData();

  return <div>Idea {idea.title}</div>;
}
```

I created a function called `fetchIdea` that fetches a idea from our mock API. The loader calls this function and returns the data. We can then use the `Route.useLoaderData` hook to get the data in the component.

