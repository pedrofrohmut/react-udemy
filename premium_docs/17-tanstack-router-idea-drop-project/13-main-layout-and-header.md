# Main Layout & Header

In this section, we will create a main layout for our application and add a header component. The header will contain the navigation links to the ideas, homepage and the new idea page.


## Idea Layout Route

With the latest version of TanStack Router, you can create a file in your route folder called `route.tsx` and it will serve as the layout for all the pages in that folder. We don't need this right now, but I want to show you how it works real quick,

Create a new file at `src/routes/ideas/route.tsx` file and add the following code:

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/ideas')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/ideas"!
      <Outlet />
    </div>
  );
}
```

Now any route that you create that is in the `ideas` folder will use this layout.

## Root Layout

Let's open the `src/routes/__root.tsx` file and create a RootLayout in that file and use it:

```tsx
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient } from '@tanstack/react-query';

// Declare the shape of the context
type RouterContext = {
  queryClient: QueryClient;
};

// Pass the context type as a generic
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <main className='flex-grow flex items-center justify-center p-6'>
        <div className='w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8'>
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
```

In this code, we are creating a `RootLayout` component that will be used as the main layout for our application. We are using the `Outlet` component to render the child routes inside the layout. The layout is styled with Tailwind CSS classes to create a responsive and visually appealing design.

## Header Component

I want to have a lightbulb icon as the logo. We will use the Lucide React library for that. You can install it by running the following command:

```bash
npm install lucide-react
```

Now, lets create a new file at `src/components/Header.tsx` and add the following code:

```tsx
import { Link } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';

const Header = () => {
  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto px-6 py-4 flex justify-between items-center'>
        <div className='flex items-center space-x-2 text-gray-800'>
          <Link to='/' className='flex items-center space-x-2 text-gray-800'>
            <Lightbulb className='w-6 h-6 text-yellow-500' />
            <h1 className='text-2xl font-bold'>IdeaDrop</h1>
          </Link>
        </div>

        <nav className='flex items-center space-x-4'>
          <Link
            to='/ideas'
            className='text-gray-600 hover:text-gray-900 font-medium transition px-3 py-2 leading-none'
          >
            Ideas
          </Link>
          <Link
            to='/ideas/new'
            className='bg-blue-600 hover:bg-blue-700 text-white font-medium transition px-4 py-2 rounded-md leading-none'
          >
            + New Idea
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
```

Now import it in the `RootLayout` component and use it:

```tsx
import Header from '../components/Header';

function RootLayout() {
  return (
   <div className='min-h-screen bg-gray-100 flex flex-col'>
      <HeadContent />
      <Header />
      <main className='flex justify-center p-6'>
        <div className='w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8'>
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}
```

Now you should see the header on all pages.
