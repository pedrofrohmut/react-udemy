# Custom Not Found Page

If we go to a url that does not exist like `http://localhost:5174/test`, we get a blank page. Let's create a custom 404 page.

Create a new file at `app/routes/errors/not-found.tsx` and add the following code:

```tsx
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <section className='flex flex-col items-center justify-center min-h-[70vh] text-center px-6'>
      <h1 className='text-6xl font-extrabold text-blue-400 mb-4'>
        404
      </h1>
      <h2 className='text-2xl font-semibold text-white mb-2'>
        Page Not Found
      </h2>
      <p className='text-gray-400 mb-6 max-w-md'>
        Sorry, the page you're looking for doesn't exist. It might have been
        moved or deleted.
      </p>
      <Link
        to='/'
        className='inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
      >
        Go Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
```

Now in the `app/routes.ts` file, add the route for "\*" to map to the `NotFoundPage` component. This will catch all routes that do not match any of the defined routes.

```jsx
 layout('routes/layouts/main.tsx', [
    route('about', './routes/about/index.tsx'),
    route('contact', './routes/contact/index.tsx'),
    route('projects', './routes/projects/index.tsx'),
    route('projects/:id', './routes/projects/details.tsx'),
    route('blog', './routes/blog/index.tsx'),
    route('*', './routes/errors/not-found.tsx'), // Add this line
  ]),
```

Now go to any route that does not exist and you should see the custom 404 page.
