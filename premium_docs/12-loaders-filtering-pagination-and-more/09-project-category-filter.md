# Project Category Filter

Let's add a filter to our project list so that users can filter projects by category.

First, add a new state variable to the `app/routes/projects/index.tsx` file to store the selected category. We'll use this state variable to filter the projects based on the selected category.

```jsx
const [selectedCategory, setSelectedCategory] = useState('All');
```

## Get Unique Categories

We need to get the unique categories. If we loop over the projects, the same category will be repeated multiple times. To get the unique categories, we can use the `Set` data structure.

Add this just above the `renderPagination` function declaration:

```jsx
// Get unique categories
const categories = ['All', ...new Set(projects.map((p) => p.category))];
```

## Filter Projects

Under that we want to filter through the projects based on the selected category:

```jsx
// Filter by category
const filteredProjects =
  selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);
```

## Add The Filter To The UI

Now we need to add the filter to the UI. Add this just under the heading:

```jsx
{
  /* Category Filter */
}
<div className='flex flex-wrap gap-2 mb-8'>
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => {
        setSelectedCategory(cat);
        // Reset page number to 1 when category is changed
        setCurrentPage(1);
      }}
      className={`px-3 py-1 rounded text-sm ${
        selectedCategory === cat
          ? 'bg-blue-600 text-white'
          : 'bg-gray-700 text-gray-200'
      }`}
    >
      {cat}
    </button>
  ))}
</div>;
```

We are mapping over the `categories` array and rendering a button for each category. When a category is clicked, we set the `selectedCategory` state variable to that category and reset the `currentPage` state variable to 1.

## Add To Pagination Logic

Finally, we need to use the filtered projects. We do this in the pagination logic. We want to paginate the filtered projects, not all the projects.

We need to update the values to use the pagination logic. We want to paginate the filtered projects, not all the projects.

Add the following but make sure you move it below the `filteredProjects` variable:

```jsx
// Pagination logic
const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
const indexOfLast = currentPage * projectsPerPage;
const indexOfFirst = indexOfLast - projectsPerPage;
const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
```

You should now be able to filter the projects by category. The pagination will also work with the filtered projects.

Here is the final code for the `app/routes/projects/index.tsx` file:

```tsx
import { useState } from 'react';
import type { Route } from './+types/index';
import type { Project } from '~/types';
import ProjectCard from '~/components/project-card';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const url = new URL('/data/projects.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  const data = await res.json();
  return { projects: data };
}

// Calculate total pages

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  const { projects } = loaderData as { projects: Project[] };

  // Get unique categories
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  // Pagination button renderer
  const renderPagination = () => (
    <div className='flex justify-center gap-2 mt-8'>
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => setCurrentPage(idx + 1)}
          className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === idx + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-200'
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <h2 className='text-3xl font-bold mb-8 text-white'>🚀 Projects</h2>
      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              // Reset page number to 1 when category is changed
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className='grid gap-6 sm:grid-cols-2'>
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {renderPagination()}
    </>
  );
};

export default ProjectsPage;
```
