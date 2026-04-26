# Details Page Output

We have the loader getting the project details from the JSON file. Now we need to diasplay the project details on the page.

Import the `Link` component and the `FaArrowLeft` icon from `react-icons`:

```tsx
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';
```

Add the following to the `ProjectDetailsPage` component:

```tsx
const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData as Project;

  return (
    <>
      {/* Go Back Button */}
      <Link
        to='/projects'
        className='flex items-center text-blue-400 hover:text-blue-500 mb-6 transition'
      >
        <FaArrowLeft className='mr-2' />
        Back to Projects
      </Link>

      <div className='grid md:grid-cols-2 gap-8 items-start'>
        {/* Project Image */}
        <div>
          <img
            src={project.image}
            alt={project.title}
            className='w-full rounded-lg shadow-md'
          />
        </div>

        {/* Project Info */}
        <div>
          <h1 className='text-3xl font-bold text-blue-400 mb-4'>
            {project.title}
          </h1>
          <p className='text-gray-300 text-sm mb-4'>
            {new Date(project.date).toLocaleDateString()} • {project.category}
          </p>
          <p className='text-gray-200 mb-6'>{project.description}</p>

          <a
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition'
          >
            View Live Site →
          </a>
        </div>
      </div>
    </>
  );
};
```

This will display the project image, title, date, category, description, and a button to view the live site. The back button will take the user back to the projects page.
