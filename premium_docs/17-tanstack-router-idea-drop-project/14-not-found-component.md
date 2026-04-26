# Not Found Component

Right now, if you go to a page that does not exist, it tells you "Not Found", which is ok I guess. However, you may want to customize this and make it look a little better. All you have to do is add the `notFoundComponent` property to the router object.

Open your `src/routes/__root.tsx` file and add the following code under the `RootLayout` component:

```tsx
function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center text-center py-20'>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>404</h1>
      <p className='text-lg text-gray-600 mb-6'>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to='/'
        className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition'
      >
        Go back home
      </Link>
    </div>
  );
}
```

Be sure to import the `Link` component from `@tanstack/react-router` at the top of the file:

```tsx
import { Link } from '@tanstack/react-router';
```

Then add it to the router object:

```tsx
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
});
```

Now visit a page that does not exist and you should see the rendered component.
