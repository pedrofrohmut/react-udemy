# Project Pagination

Right now we only have a few projects but what if we have a lot of projects? We need to add pagination to the projects page. This is where we can have multiple pages of projects and navigate between them.

There are packages that you can use for this, but I want to keep it simple and show you how to do it without a package.

Let's add a new piece of state called "currentPage" to the `app/routes/projects/index.tsx` file as well as the number of projects we want to show per page.:

```jsx
const [currentPage, setCurrentPage] = useState(1);
const projectsPerPage = 2;
```

Make sure to import `useState` from React at the top of the file:

```jsx
import { useState } from 'react';
```

## Calculate Total Pages

We need to calculate the total number of pages based on the number of projects and the projects per page. Add the following code below where we get the projects from the loaderData:

```jsx
// Calculate total pages
const totalPages = Math.ceil(projects.length / projectsPerPage);
```

Now we need to get the current page's projects. Add the following code below the `totalPages` calculation:

```jsx
// Get current page's projects
const indexOfLast = currentPage * projectsPerPage;
const indexOfFirst = indexOfLast - projectsPerPage;
const currentProjects = projects.slice(indexOfFirst, indexOfLast);
```

Now we replace the `projects` array with the `currentProjects` array in the `map` function:

```jsx
<div className='grid gap-6 sm:grid-cols-2'>
  {currentProjects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

## Paginatino Buttons

Now you should only see two projects. So we need a way to go to other pages. Let's store the JSX in a function above the return statement:

```jsx
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
```

Here, we are creating an array of buttons based on the total number of pages. We are also checking if the current page is the same as the index and changing the styles accordingly.

Let's look at this code: 

```js
Array.from({ length: totalPages }, (_, idx) => ...)
````
The `Array.from()` creates a new array with totalPages number of items.

The second argument is a map function, where `_` is the value (not used) and `idx` is the index (starting at 0)

So if `totalPages = 3`, this produces:

```
[0, 1, 2] → turned into buttons for [1, 2, 3]
```

The underscore _ is just a throwaway variable — it represents the value of each item in the array, but in this case, it's not used at all. We don't need a value, we just need the index to generate page numbers and keys for our buttons.

Now add the following code below the `</div>` after `currentProjects.map`. You will have to wrap both in a fragment:

```jsx
return (
  <>
    <h2 className='text-3xl font-bold mb-8 text-white'>🚀 Projects</h2>
    <div className='grid gap-6 sm:grid-cols-2'>
      {currentProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
    {totalPages > 1 && renderPagination()}
  </>
);
```

Now you should see the pagination buttons at the bottom of the page as long as the total pages is greater than 1. You can click on them to see the other projects. You can change the `projectsPerPage` to see how it affects the pagination. I will set mine to 6.

```tsx
const projectsPerPage = 6;
```
