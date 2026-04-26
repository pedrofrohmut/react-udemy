# Layout Routes

There may be times when you want certain pages to have a common layout. For example, you may want to have a sidebar or a header that is on one or multiple pages. In this case, you can use layout routes.

I want to create a home layout route because I don't want the Hero component stuck in the container. I want it to spread all the way to the edges of the screen.

There are a few ways to do this. We could put a `layout.tsx` file in the `routes/home` directory as well as the other pages, however there would be a lot of duplication. Instead I will create a folder at `routes/layouts` and add a new file called `home.tsx` and add the following code:

```tsx
const HomeLayout = () => {
  return <>Home Layout</>;
};

export default HomeLayout;
```

Now in the routes file, add the layout route for the home page:

```tsx
export default [
  layout('routes/layouts/home.tsx', [index('routes/home/index.tsx')]), // Home layout route
  route('about', './routes/about/index.tsx'),
  route('contact', './routes/contact/index.tsx'),
  route('projects', './routes/projects/index.tsx'),
  route('blog', './routes/blog/index.tsx'),
] satisfies RouteConfig;
```

Now on the home page, you will only see the text "Home Layout". This is because we haven't added the `Outlet` component to the layout route. The `Outlet` component is used to render the child routes of the layout route.

Add the `Outlet` component to the `HomeLayout` component with the container styling:

```tsx
import { Outlet } from 'react-router';

const HomeLayout = () => {
  return (
    <>
      <section className='max-w-6xl mx-auto px-6 my-8'>
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
```

Now let's remove the Hero component from the home page and add it to the `HomeLayout` component. This way, the Hero component will be rendered in the home layout.

```tsx
import { Outlet } from 'react-router';
import Hero from '~/components/hero';

const HomeLayout = () => {
  return (
    <>
      <Hero />
      <section className='max-w-6xl mx-auto px-6 my-8'>
        <Outlet />
      </section>
    </>
  );
};

export default HomeLayout;
```

Now, lets create a main layout route. This will be the layout for all the other pages. Create a new file called `main.tsx` in the `routes/layouts` directory and add the following code:

```tsx
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <section className='max-w-6xl mx-auto px-6 my-8'>
      <Outlet />
    </section>
  );
};

export default MainLayout;
```

We are adding the container styling here, so now delete it from the `root.tsx` layout `main` element:

```tsx
<main>{children}</main>
```

Now use the main layout route in the routes file:

```tsx
export default [
  layout('routes/layouts/home.tsx', [index('routes/home/index.tsx')]),
  layout('routes/layouts/main.tsx', [
    route('about', './routes/about/index.tsx'),
    route('contact', './routes/contact/index.tsx'),
    route('projects', './routes/projects/index.tsx'),
    route('blog', './routes/blog/index.tsx'),
  ]),
] satisfies RouteConfig;
```

Your pages should now be wrapped in a fragment `<></>` instead of a `section`. The layout is adding the `section` element.
