# Fetch Project Details From Strapi

Let's now get the projects details data from Strapi.

The link to the individual project needs the document ID not the regular ID. Open the `app/components/project-card.tsx` file and update the link to use the `documentId` instead of the `id`:

```tsx
 <Link
      to={`/projects/${project.documentId}`}
      className='block transform transition duration-300 hover:scale-[1.02]'
    >
```

It will be a 404 because its still looking at the JSON file. We will fix that in the next step.

## Details Page

Open the `app/routes/projects/details.tsx` file.

Import the Strapi types:

```tsx
import type { StrapiResponse, StrapiProject } from '~/types';
```

I have a client loader there because I wanted to show you how to use it, but I am going to change it to a server loader. That way, the data is fetched on the server and sent to the client.

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const { id } = params;

  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/projects?filters[documentId][$eq]=${id}&populate=*`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch project');
  }

  const json: StrapiResponse<StrapiProject> = await res.json();

  if (!json.data.length) {
    throw new Response('Not Found', { status: 404 });
  }

  const item = json.data[0];

  const project: Project = {
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
  };

  return { project };
}
```

We hit the endpoint with the documentId as the id. We get the single item in an array. Then we map it to the Project type. We also check if the image exists and set a default image if it doesn't.
