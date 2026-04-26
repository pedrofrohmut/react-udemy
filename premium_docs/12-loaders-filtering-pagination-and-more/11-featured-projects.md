# Featured Projects

On the homepage, I want to display a list of featured projects. 

## Environment Variable For API URL

Before we work on the featured projects, let's add our API URL to an environment variable. Create a `.env` file in the root and add the following:

```
VITE_API_URL="http://localhost:8000"
```

Now open the following files and change the request URL to `import.meta.env.VITE_API_URL`:

- app/routes/projects/index.tsx
- app/routes/projects/details.tsx

## Featured Projects Component

Featured projects have a field of `featured: true` in their document. We will use a loader to fetch the projects and then filter them on the client side.

Create a new file called `features-projects.tsx` in the `app/components` directory and just add the following for now:

```tsx
import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import ProjectCard from './project-card';
import type { Project } from '~/types';

const FeaturedProjects = () => {
  return (
    <section>
      <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>
        🌟 Featured Projects
      </h2>
    </section>
  );
};

export default FeaturedProjects;
```

Now import it into the `app/routes/home/index.tsx` file and add it to the `Home` component:

```tsx
import FeaturedProjects from '~/components/featured-projects';

const HomePage = () => {
  return (
    <>
      <FeaturedProjects />
    </>
  );
};

export default HomePage;
```

You should see the heading.

## Loader In Home Route

Since we are embedding the `FeaturedProjects` component in the home route, we need to add a loader to the home route. This loader will fetch the projects and pass them to the `FeaturedProjects` component.

Open the `app/routes/home/index.tsx` file and add the following code:

```tsx
import type { Route } from './+types/index';
import type { Project } from '~/types';
import FeaturedProjects from '~/components/featured-projects';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
 const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  return { projects: data };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
    </>
  );
};

export default HomePage;
```

The loader will fetch the projects and pass them to the `FeaturedProjects` component. The `FeaturedProjects` component will then filter the projects and display them. We are also passing in a `count` prop to limit the number of projects displayed to 2.

## Display Featured Projects

In the `FeaturedProjects` component, we need to display the featured projects. Add the following code:

```tsx
import type { Project } from '~/types';
import ProjectCard from '~/components/project-card';

const FeaturedProjects = ({
  projects,
  count,
}: {
  projects: Project[];
  count: number;
}) => {
  const featured = projects.filter((p) => p.featured).slice(0, count);
  return (
    <section>
      <h2 className='text-2xl font-bold mb-6 text-gray-800 dark:text-white'>
        🌟 Featured Projects
      </h2>
      <div className='grid gap-6 sm:grid-cols-2'>
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
```

We are taking in the `projects` and `count` props. We are filtering the projects to only include the featured ones and then slicing them to only include the first `count` projects. We are then mapping over the featured projects and displaying them using the `ProjectCard` component.

You should now see the featured projects on the homepage. You can change the `count` prop to display more or fewer projects. Remember, it only shows projects that have the `featured: true` field in their document.
