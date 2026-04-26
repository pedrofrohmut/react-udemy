# What Is TanStack Query?

Before we jump into our GitHub Finder project, let's talk a bit about what TanStack Query is. In fact, we should talk about what TanStack in general. 

TanStack is a collection of powerful, headless libraries for building modern web apps — especially in React, but increasingly in other frameworks too. It was created by Tanner Linsley, and it's known for offering high-quality, framework-agnostic tools that give you full control over logic and rendering.

## What Does TanStack Include?

- TanStack Query: 	 Data fetching, caching, and syncing with the server
- TanStack Router: 	 Type-safe, file-based routing system (React-focused)
- TanStack Table: 	 Headless UI for building powerful and customizable tables
- TanStack Virtual:  Efficiently render large lists or tables using virtualization
- TanStack Form:     Headless form builder with validation and field logic (New)
- TanStack Store:    Framework agnostic type-safe store w/ reactive framework adapters (Alpha)
- TanStack Start:    Full-stack React and Solid framework powered by TanStack Router. Full SSR, server functions, API routes and more. This is in Beta but something I'm really looking forward to.

As you can see, there are a ton of great tools. It focuses on the logic and is headless by design. It's highly customizable and you're not locked into a specific component library or styling system and it's framework agnostic. While many of the tools are React-first, they're not React-specific.

In this course, we're only going to focus on TanStack Query and in the next section, TanStack Router, which is an alternative to React Router.

So let's talk more about TanStack Query. It is a library that helps you fetch, cache, and update data in your React apps — especially when working with APIs. It was formerly known as "React Query" and it's been around for a while.

Think of it as a smart assistant that handles:

    - Fetching data (like fetch() or Axios)
    - Caching the results so you don’t refetch the same data
    - Keeping data fresh in the background
    - Handling loading, error, and success states automatically
    - Syncing with the server after mutations (like POST/PUT/DELETE)

So far, in this course, we have fetched data in a couple ways. With a barebones single page react app, we use the `useEffect` hook and we create a loading state and error state and we have to manage those manually through the entire process. You know how we setLoading to true initially and then set to false after we get data from the API? With TanStack Query, we don't have to worry about that. It handles it for us. It also handles caching so that we don't have to reach out and make a request if we already have the latest data.

Let's look at a simple example:

Normally, we would do something like this:

```js
useEffect(() => {
  fetch('/api/posts')
    .then(res => res.json())
    .then(setData)
    .catch(setError);
}, []);
```

Well with TanStack Query, we could do this:

```js
const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: () => fetch('/api/posts').then(res => res.json()),
});

```

Not only is this cleaner, but it

- Caches the result
- Refetches when needed
- Gives you the loading and error states

`useQuery` his the main hook you use to fetch data in a React app using TanStack Query.
It handles everything for you: fetching, caching, error handling, loading states, and refetching.

The `queryKey` is used to cache the data correctly. It also triggers updates when changed, so you can almost think of it as the dependency array in a `useEffect`. 

The `queryFn` is the function that fetches your data. It runs when:

    - The component using the query mounts
    - The queryKey changes
    - You manually trigger a refetch
    - TanStack Query automatically refetches (e.g., on window focus)

Think of it as the "what to do to get the data" part of the query.

## Mutations

So that is a simple example of getting data but what about mutating it? For that, we have mutations.

Mutations are used for POST, PUT and DELETE requests and use the `useMutation` hook.

Let's look at an example:

```js
import { useMutation } from '@tanstack/react-query';

const createPost = async (newPost) => {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });

  if (!res.ok) throw new Error('Failed to create post');

  return res.json();
};

const { mutate, isLoading, isError, isSuccess } = useMutation({
  mutationFn: createPost,
});
```

We simple create our request and pass it into the `useMutation` hook as `mutateFn`. It then gives the loading, error and success states along with the `mutate` function which is what we call to use it.

You would use it like this:

```js
mutate({ title: 'New Post', body: 'Hello world' });
```

We can handle what happens with `onSuccess` or `onError` like this:

```js
const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    console.log('Post created!');
    queryClient.invalidateQueries(['posts']); // refetch posts
  },
});
```

That is an overview of TanStack Query. Let's use it while creating our Github Finder project.
