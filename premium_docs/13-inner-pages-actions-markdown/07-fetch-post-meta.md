# Fetch Post Meta

We are going to work on the blog page but first. We have our markdown files with the post content, but we need to create a JSON file with the post meta. This will include the title, slug, and excerpt for each post. We will use this JSON file to render the blog page with the list of posts.

Let's create a new file at `public/posts-meta.json` and add the following code:

```json
[
  {
    "id": "1",
    "slug": "react-hooks-overview",
    "title": "A Practical Guide to React Hooks",
    "excerpt": "Understand useState, useEffect, and custom hooks with real-world examples.",
    "date": "2025-03-01"
  },
  {
    "id": "2",
    "slug": "css-utility-vs-component",
    "title": "Utility-First vs Component-Based CSS",
    "excerpt": "Explore the pros and cons of Tailwind CSS vs traditional component styling.",
    "date": "2025-02-25"
  },
  {
    "id": "3",
    "slug": "api-authentication-strategies",
    "title": "API Authentication Strategies Explained",
    "excerpt": "A breakdown of API auth methods like JWT, OAuth2, API keys, and more.",
    "date": "2025-02-18"
  },
  {
    "id": "4",
    "slug": "writing-clean-code",
    "title": "Writing Clean and Maintainable Code",
    "excerpt": "Best practices to improve code readability, structure, and reusability.",
    "date": "2025-02-10"
  },
  {
    "id": "5",
    "slug": "deploying-fullstack-apps",
    "title": "Deploying Full-Stack Apps: A Simple Guide",
    "excerpt": "Everything you need to know to deploy your frontend and backend together.",
    "date": "2025-01-28"
  }
]
```

I will add the JSON file to the download folder for this lesson. You can also just copy the data above and create the file manually. Call it `posts-meta.json`.

Add the JSON file to the `public/data` folder.

## Post Types

Let's create a type for our post meta. Open the `app/types.ts` file and add the following code:

```ts
export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};
```

## Fetching The Data

We are going to use a loader to get the data. This is a function that runs on the server and fetches data before the component is rendered. It is a great way to get data for your components without having to use `useEffect` or `useState`.

Add the following imports at the top of the `app/routes/blog/index.tsx` file:

```ts
import type { Route } from './+types/index';
import type { PostMeta } from '~/types';
import { Link } from 'react-router';
```

## Create The Loader

Create the loader right below the imports:

```ts
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL('/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await res.json();
  return { posts: data };
}
```

We are just fetching from the JSON file we created earlier. We are using the `request.url` to get the base URL and then appending the path to the JSON file. Later we can replace this with a real API.

## Getting The Data In The Component

Add the `loaderData` prop to the component and extract the `posts` from it:

```ts
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData as { posts: PostMeta[] };

  return ();
};
};
```
