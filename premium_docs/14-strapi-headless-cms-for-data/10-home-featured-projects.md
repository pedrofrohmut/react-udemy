# Home Featured Projects

The last thing we need to do with projects is show the featured projects on the home page.

First off, make sure that you have some featured projects in your Strapi instance. You can do this by going to the `projects` collection type and checking the `featured` checkbox for some of the projects. i will select 2 projects to be featured.

Open the `app/routes/home/index.tsx` file and import the Strapi types:

```tsx
import type { StrapiResponse, StrapiProject } from '~/types';
```

We are still getting the blog post meta from the JSON file. So Add the following in the loader:

```tsx
const [projectsRes, postsRes] = await Promise.all([
  fetch(
    `${
      import.meta.env.VITE_API_URL
    }/projects?filters[featured][$eq]=true&populate=*`
  ),
  fetch(new URL('/data/posts-meta.json', url)), // We'll change this to Strapi later!
]);
```

Now instead of this:

```tsx
const [projects, posts] = await Promise.all([
  projectsRes.json(),
  postsRes.json(),
]);

return { projects, posts };
```

We will do this:

```tsx
const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
const postsJson = await postsRes.json();

const projects = projectsJson.data.map((item: any) => ({
  id: item.id,
  documentId: item.documentId,
  title: item.title,
  description: item.description,
  image: item.image?.url
    ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
    : '/images/no-image.png',
  url: item.url,
  date: item.date,
  category: item.category,
  featured: item.featured,
}));

return { projects, posts: postsJson };
```

You should now see your featured projects.

That's it. You can now delete the `public/data/projects.json` file if you want. Now we will work on the blog posts.
