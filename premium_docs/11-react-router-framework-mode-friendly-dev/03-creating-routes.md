# Creating Routes

Creating routes is a bit different in framwork mode than in declarative mode. Let's look at how it's done.

Open your `app/routes.ts` file. This is where we will define our routes. You will see the following code:

```tsx
import { type RouteConfig, index } from '@react-router/dev/routes';

export default [index('routes/home.tsx')] satisfies RouteConfig;
```

This is the default route configuration. We are importing the `RouteConfig` type and the `index` function from the `@react-router/dev/routes` module. We are then exporting an array of routes that satisfies the `RouteConfig` type. We are setting the default or index route to `routes/home.tsx`. This is called an "index route". These will render into their parent's outlet at the parent URL. This allows us to create nested routes, which I will get into later.

## Adding A Route

I want to add an about route. To do that, we need the `route` function. Let's import that:

```tsx
import { type RouteConfig, index, route } from '@react-router/dev/routes';
```

Now we need to add our route to the exported array. The `route` function takes two arguments. The first argument is the name of the route, and the second argument is the path to the component:

```tsx
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', './routes/about.tsx'),
] satisfies RouteConfig;
```

Notice that we don't have to import the page/component like we do in declarative mode. We just pass the path to the component.

## About Route

Let's create a new file in the `app/routes` directory called `about.tsx`. Remember, we are using TypeScript, so the file extension is `.tsx` instead of `.jsx`. Also, any files that would be `.js`, we will use `.ts`.

Add the following code to the `about.tsx` file:

```tsx
const AboutPage = () => {
  return (
    <section>
      <h1 className='text-3xl font-bold text-white mb-2'>Hey, I'm Brad 👋</h1>
    </>
  );
};

export default AboutPage;
```

You can replace the name with your own.

This is just another React component, but the terminology that React Router uses is that it's a "Route Module". So when you hear that term, it's just a React component that is a route.

We are alosusing Tailwind classes. Tailwind is already installed and configured.

Now go to `http://localhost:3000/about` and you should see the about page. It's as simple as that to create routes in framework mode.

## Route Folders

This is preference, but I like to create a folder for each route. This way, we can create other related routes in the folder as well as layouts.

Let's create a folder for the about route. Create a new folder in the `app/routes` directory called `about`. Move the `about.tsx` file into the `about` folder and rename it to `index.tsx`. The `index.tsx` file will be the default route for the `about` folder. Now we need to update the route in the `app/routes.ts` file:

```tsx
export default [
  index('routes/home.tsx'),
  route('about', './routes/about/index.tsx'),
] satisfies RouteConfig;
```

## Home Route

I want to change the home page a bit. First off, create a folder called `routes/home` and move the home route into that folder and rename the file to `index.tsx`. Open the `app/routes/home/index.tsx` file and add the following code:

```tsx
const HomePage = () => {
  return (
    <section>
      <h1>Welcome</h1>
    </>
  );
};

export default HomePage;
```

It's ok to overwrite the meta stuff because I will go over that in the next lesson.

Change the route in the `app/routes.ts` file to point to the new file:

```tsx
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  route('about', './routes/about/index.tsx'),
] satisfies RouteConfig;
```

## Contact Route

Let's create a couple of other routes. Create a new file at `app/routes/contact/index.tsx`. Add the following code to the file:

```tsx
const ContactPage = () => {
  return (
    <section>
      <h2 className='text-3xl font-bold text-white mb-8 text-center'>
        📬 Contact Me
      </h2>
    </section>
  );
};

export default ContactPage;
```

Add the route in the `app/routes.ts` file:

```tsx
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  route('about', './routes/about/index.tsx'),
  route('contact', './routes/contact/index.tsx'),
] satisfies RouteConfig;
```

Try the route by going to `http://localhost:3000/contact`.

## Projects and Blog Routes

Now create a `routes/projects/index.tsx` file in the `app/routes` directory and add the following code:

```tsx
const ProjectsPage = () => {
  return (
    <section>
      <h2 className='text-3xl font-bold mb-8 text-white'>🚀 Projects</h2>
    </section>
  );
};

export default ProjectsPage;
```

Add a file at `app/routes/blog/index.tsx` and add the following code:

```tsx
const BlogPage = () => {
  return (
    <section>
      <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>
    </>
  );
};

export default BlogPage;
```

Now add the blog and projects routes to the `app/routes.ts` file:

```tsx
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home/index.tsx'),
  route('about', './routes/about/index.tsx'),
  route('contact', './routes/contact/index.tsx'),
  route('projects', './routes/projects/index.tsx'),
  route('blog', './routes/blog/index.tsx'),
] satisfies RouteConfig;
```

That is how we create routes in framework mode. Next we will create a navabar and add links to the routes.
