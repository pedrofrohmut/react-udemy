# Using The Loader Data

We are using a loader to load the projects from our JSON file. Keep in mind, this would be very similar if we were using a database. The only difference is that we would be making a request to the api or using a database client to fetch the data.

Let's use the returned data in the JSX of the projects component:

```javascript
import type { Route } from './+types/index';
import type { Project } from '~/types';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  return { projects: data };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  return (
    <>
      <h2 className='text-3xl font-bold mb-8 text-white'>
        🚀 Projects
      </h2>

      <div className='grid gap-6 sm:grid-cols-2'>
        {projects.map((project) => (
          <div
            key={project.id}
            className='bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md'
          >
            <img
              src={project.image}
              alt={project.title}
              className='w-full h-40 object-cover'
            />
            <div className='p-5'>
              <h3 className='text-xl font-semibold text-blue-400 mb-1'>
                {project.title}
              </h3>
              <p className='text-sm text-gray-300 mb-2'>
                {project.description}
              </p>
              <div className='flex justify-between items-center text-sm text-gray-400'>
                <span>{project.category}</span>
                <span>{new Date(project.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsPage;
```

In the above code, we are using the `loaderData` prop to access the data returned from the loader. We are then using that data to render the projects in a grid layout.


## `ProjectCard` Comoponent

This should be pretty simple. We are going to create a new project component instead of rendering the project details in the `ProjectsPage` component.

I do want to wrap a link around the project card as well. This way, we can navigate to the project details page when we click on the project card.

Create a file at `app/components/project-card.tsx` and import the `Link` component and the Project type at the top of the file:

```javascript
import type { Project } from '~/types';
import { Link } from 'react-router';
```

Now add the following code to the file:

```jsx
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      to={`/projects/${project.id}`}
      className='block transform transition duration-300 hover:scale-[1.02]'
    >
      <div className='bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300'>
        <img
          src={`/images/${project.image}`}
          alt={project.title}
          className='w-full h-40 object-cover'
        />
        <div className='p-5'>
          <h3 className='text-xl font-semibold text-blue-400 mb-1'>
            {project.title}
          </h3>
          <p className='text-sm text-gray-300 mb-2'>{project.description}</p>
          <div className='flex justify-between items-center text-sm text-gray-400'>
            <span>{project.category}</span>
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
```

We are just passing in a project and displaying the details. I also added a smooth hover effect.

Now, in the `app/routes/projects.tsx` file, we can import the `ProjectCard` component and use it to render the projects.

```jsx
import ProjectCard from '~/components/project-card';
```

```jsx
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  return (
    <>
      <h2 className='text-3xl font-bold mb-8 text-white'>🚀 Projects</h2>

      <div className='grid gap-6 sm:grid-cols-2'>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};
```

That's it! Now we have a separate component for the project card.
