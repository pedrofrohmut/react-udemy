# Head & Meta Tags

We can customize the head and meta tags of our application using the `HeadContent` component in the root route and layout.

Open the `src/routes/__layout.tsx` file and add the following import:

```tsx
import { HeadContent } from '@tanstack/react-router';
```

Now, in the `Route`, add the following object:

```tsx
 head: () => ({
    meta: [
      {
        name: 'description',
        content:
          'Share, explore, and build on the best startup ideas and side hustles.',
      },
      {
        title: 'IdeaDrop - Your Idea Hub',
      },
    ],
  }),
```

The title will not show yet. You need to add the `HeadContent` component to the output:

```tsx
return (
  <div>
    <HeadContent />
    <Outlet />
    <TanStackRouterDevtools />
  </div>
);
```

Now you should see the title and meta tags for every page.

## Adding Meta Tags to Routes

You can also add meta tags to individual routes. For example, you can add a meta tag to the `src/routes/ideas/index.tsx` file:

```tsx
export const Route = createFileRoute('/ideas/')({
  component: IdeasPage,
  head: () => ({
    meta: [
      {
        title: 'IdeaDrop - View Ideas',
      },
    ],
  }),
});
```

It will override the title and meta tags for that route. You can also add other meta tags like `description`, `keywords`, etc.

## Add Favicon

I have attached a download to this lesson with some icons. Bring the images into the `public` folder. Refresh the page and you should see the new favicon.
