# Dynamic Route & Client Loader

In this lesson, we will create a dynamic route for the details page. We will also use a client loader to fetch the data and then display it.

## Create The Project Page

Let's create a new page at `app/routes/projects/details.tsx`. This page will be used to display the details of a single project.

Just add the following for now:

```tsx
const ProjectDetailsPage = () => {
  return <>Project Details</>;
};

export default ProjectDetailsPage;
```

## Add The Route

Open the `app/routes.ts` file and add the following route within the main layout route:

```tsx
 route('projects/:id', './routes/projects/details.tsx'),
```

This will create a new route at `/projects/:id` where `:id` is the project id. The `./routes/projects/details.tsx` part tells React Router to load the `ProjectDetailsPage` component from the `app/routes/projects/details.tsx` file.

Visit `/projects/1` in your browser. You should see the `Project Details` text. This means that the route is working correctly.

## Client Loader

Now I want to get the single project details from the JSON file. We can do this with a loader. Now to be clear, since we are using SSR mode, normally I would not use a client loader. I would do what I did with the projects data, however, I want to give you an example of a client loader, so I will use a client loader here. Obviously the main difference is that the loader is run on the client side, not the server side. So you could use this in place of `useEffect` to fetch data on the client side.

Add the following import to the `app/routes/projects/details.tsx` file:

```tsx
import type { Route } from './+types/details';
import type { Project } from '~/types';
```

Add the following client loader above the function component:

```tsx
export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<Project> {
  const res = await fetch(`http://localhost:8000/projects/${params.id}`);

  if (!res.ok) {
    throw new Response('Project not found', { status: 404 });
  }

  const project: Project = await res.json();
  return project;
}
```

We are getting the project ID from the URL params and then using it to find the project in the JSON file. If the project is not found, we throw a 404 error. Otherwise, we return the project data.

## Hydration Fallback

With client loaders, we are fetching the data on the client side, so we need to handle the loading state. We can do this by exporting a function called `hydrationFallback`. This function will be called when the component is mounted on the client side. We can use it to show a loading state while the data is being fetched.

Add this right below the loader function:

```tsx
export function HydrateFallback() {
  return <div>Loading...</div>;
}
```

This will show a loading state while the data is being fetched. Once the data is fetched, the component will re-render with the data.

## Use the Loader

Now we need to use the loader in the component:

```tsx
const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData as Project;
  console.log(project);

  return <>Project Details</>;
};
```

You should now see the project details in the console. In the next lesson, we will output it to the screen.
