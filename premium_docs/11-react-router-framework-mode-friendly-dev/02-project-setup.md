# Project Setup

In this project, we are going to use React Router in framework mode. This works differently than declarative mode. The folder structure is different and the way we define routes is different. It can also run in SSR or client-render mode. It also uses TypeScript by default. Don't get scared off by that. You don't need to know TypeScript to use this. It's just a superset of JavaScript. You can write JavaScript in a TypeScript file and it will work just fine. We will slowly introduce TypeScript as we go along.

We can get started the same way. Run the following command:

```bash
npx create-vite friendly-dev
```

The only difference is this time, when it asks, select "React Router v7". Select yes to install dependencies and initilize a git repository.

Open the folder within your text editor. You'll notice the structure is very different. There is no `src` folder. Instead, there is a `app` folder. In that folder is a `routes` folder. This is where we will add our routes.

Run the server with `npm run dev`

Back in the folder structure, let's take a look at the `root.tsx` file. `tsx` is a TypeScript file that has JSX in it. It is the TypeScript equivalent of a `.jsx` file.

This file is the entry point of our application. You can see there is already a `Layout` component that wraps our entire application. In the `App` component, it just has the `Outlet` component. This is where our routes will be rendered. There is also an `ErrorBoundary` component that will catch any errors that occur in our application. If you go to `http://localhost:5173/test`, you will see the error boundary in action. It will show a 404 page in the browser. You can change this to look however you want. There is also a links array for any stylesheets and so on.

## CSS

For the CSS, I want to the `app.css` to look like this:

```css
@import 'tailwindcss';

@plugin "@tailwindcss/typography";

@theme {
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

html,
body {
  @apply bg-white dark:bg-gray-950;

  @media (prefers-color-scheme: dark) {
    color-scheme: dark;
  }
}

```

We are importing Tailwind and enabling the `@tailwindcss/typography` plugin. This enables the Typography plugin (also known as "Prose plugin"). This provides prebuilt styles for long-form content like blog posts, Markdown, docs, etc., under the .prose class. The reason that I'm using it is because before we get into using a database and Strapi, we'll be using Markdown files for our blog posts. This helps us style those pages.

Then we are defining a variable for the font stack.

Wwe then use Tailwind’s `@apply` directive to apply utility classes directly inside CSS.

This applies a white background normally, and `gray-950` background when dark mode is enabled.

The media query tells the browser to treat the page as a dark-themed document when in dark mode. This helps native UI elements (like form inputs, scrollbars) adapt automatically.

## Clean Up `home.tsx`

In the `home.tsx` file, let's add the following for now:

```js
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'The Friendly Dev Portfolio' },
    { name: 'description', content: 'Web desgin and development projects ' },
  ];
}

export default function Home() {
  return <div>My App</div>;
}
```

The `meta` function is used to add custom titles and meta tags to the page. Since this is an SSR app, search engines won't have an issue finding the meta tags and keywords, etc like it would a client-side project.

By default, the app is server-side rendered and we can see that in the `react-router.config.ts` file. We could change this to `client` if we want, but I'm going to keep it as `ssr`.

## `Route` type

You also have this `Route` type being brought in. This is part of how React Router v7 handles type-safe routing when using TypeScript in framework mode.

The Route type is auto-generated based on your file structure and the route configuration. It provides type definitions for:

   - meta() function arguments
    - loader() and action() args (like params, request, etc.) Loaders and actions are used to fetch and mutate data. We'll get into those later.
    - Route-specific hooks like useLoaderData()

You can see the meta function is using `Route.MetaArgs`. This is defining the expected shape of the arguments passed to the meta() function — things like params, location, and data from loaders. It ensures that if you try to access something that doesn’t exist or is typed incorrectly, TypeScript will alert you before runtime.

If you define a loader() in your route file, you could use Route.LoaderArgs.

This gives you better autocomplete, fewer runtime errors, and a safer development experience — but again, you don’t need to fully understand TypeScript to benefit from this. You can write regular JavaScript, and the types will still help guide you when you're inside .tsx files.


## Layout Container

I just want to add a container around the layout. This will center the content on the page. I will use Tailwind CSS classes to do this. I will add the following classes to the `main` element in the `Layout` component:

```tsx
<main className='max-w-6xl mx-auto px-6 my-8'>{children}</main>
```

In the next lesson, we will look at creating routes.
