# Fetch Projects From Strapi

Now that we have an API for our projects, we need to fetch them from the frontend.

Let's open the frontend and go to the `src/routes/projects/index.tsx` file. This is where we will fetch the projects from Strapi and display them on the page.

We already have a loader fetching the projects from our JSON file. We need to replace this with the following code:

```tsx
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch projects');
  }

  const json = await res.json();

  const projects = json.data.map((item) => ({
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

  return { projects };
}
```

This code fetches the projects from the Strapi API and maps them to the format we need for our application.

We need to add the `populate=*` query parameter to the URL to fetch the related data (like images).

