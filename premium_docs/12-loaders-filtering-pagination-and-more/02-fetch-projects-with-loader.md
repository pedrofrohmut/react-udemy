# Fetch Projects With Loader

Now that we have some of the general parts of the website done, let's start working on the projects page. This page will display all the projects. Now usually, you are going to have some kind of backend API that will provide you with the data. Ultimatley, we are going to setup Strapi, which is a headless CMS, but for now, we're goiing to setup JSON Server to create a fake REST API for us. If you did the shopping cart project, this should be very familiar.

Install JSON Server:

```bash
npm i -D json-server
```

You can find the JSON file and the images from the download link on the video lesson page. I will post it here as well:

```json
{  
"projects": [
  {
    "id": 1,
    "title": "DevDash",
    "description": "A productivity dashboard for developers to track tasks, goals, and inspiration.",
    "image": "/images/project-1.png",
    "url": "https://example.com",
    "date": "2025-02-01",
    "category": "Fullstack",
    "featured": false
  },
  {
    "id": 2,
    "title": "SnapFeed",
    "description": "A photo-sharing app with uploads, a feed, and social features.",
    "image": "/images/project-2.png",
    "url": "https://example.com",
    "date": "2025-01-20",
    "category": "Frontend",
    "featured": true
  },
  {
    "id": 3,
    "title": "NoteNest",
    "description": "A note-taking app with categories and local storage support.",
    "image": "/images/project-3.png",
    "url": "https://example.com",
    "date": "2024-12-15",
    "category": "Frontend",
    "featured": true
  },
  {
    "id": 4,
    "title": "FitTrack",
    "description": "A fitness tracker that logs workouts and progress visually.",
    "image": "/images/project-4.png",
    "url": "https://example.com",
    "date": "2024-11-05",
    "category": "Fullstack",
    "featured": false
  },
  {
    "id": 5,
    "title": "CodeCritic",
    "description": "A code snippet review tool with comments and upvotes.",
    "image": "/images/project-5.png",
    "url": "https://example.com",
    "date": "2024-10-12",
    "category": "Frontend",
    "featured": false
  },
  {
    "id": 6,
    "title": "InspoQuote",
    "description": "A daily inspiration quote generator with save/share options.",
    "image": "/images/project-6.png",
    "url": "https://example.com",
    "date": "2024-09-28",
    "category": "Fullstack",
    "featured": false
  },
  {
    "id": 7,
    "title": "Blogify",
    "description": "A minimalist blogging platform with Markdown and comments.",
    "image": "/images/project-7.png",
    "url": "https://example.com",
    "date": "2024-09-01",
    "category": "Fullstack",
    "featured": false
  }
]
}
```

We have 7 projects with an id, title, description, image, url, date, category and a featured field. We are going to display this data on the projects page. Each project will be in a "project" component as well.

Put `data/db.json` in the root of your project and the images in the `public` folder.

Add the following script to the `package.json` file:

```bash
 "json-server": "json-server data/db.json --port 8000"
```

Now run it:

```bash
npm run json-server
```

We are going to use a loader to load the data. We will start with SSR loaders and I will show you client loaders later.


## Project Component

Let's open the project page/component at `app/routes/projects/index.tsx` and add the following import:

```jsx
import type { Route } from './+types/index';
```

React Router generates route-specific types to power type inference for URL params, loader data, and more. We are going to use this to type the loader data.

Add the following above the component function:

```jsx
export async function loader({ request }: Route.LoaderArgs): Promise<any> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  return { projects: data };
}
```

We are fetching the data from the server and returning an object with a `projects` array.

How cool is this? No useEffect, no useState, no loading state. We are using the loader function to fetch the data. What's even cooler is this runs on the server, which means we could use an ORM like Prisma or Mongoose to fetch the data from a database. But for now, we are going to use the JSON file.

## Using The Data

To use the data returned from the loader, we pass it into the component as a prop. We can destructure it in the component function. So let's do that now.

```tsx
const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData;
  console.log(projects);

  return (
    <>
      <h2 className='text-3xl text-white font-bold mb-8'>🚀 Projects</h2>
    </>
  );
};

export default ProjectsPage;
```

That's it! We are now fetching the data from the JSON file and passing it to the component. We can now use this data to display the projects. Before we do that though, I want to utilize TypeScript to type the data. In the next lesson, we will create a type for the project data and use it in the component. This will help make our code more readable and maintainable.
