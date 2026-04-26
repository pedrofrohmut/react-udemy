# Latest Posts

Now we need to show the latest posts on the homepage.

Open the `app/routes/home/index.tsx` file. Replace the loader with the following:

```tsx
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> {
  const [projectsRes, postsRes] = await Promise.all([
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/projects?filters[featured][$eq]=true&populate=*`
    ),
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/posts?sort[0]=date:desc&pagination[limit]=3&populate=image`
    ),
  ]);

  if (!projectsRes.ok || !postsRes.ok) {
    throw new Error('Failed to fetch projects or posts');
  }

  const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
  const postsJson: StrapiResponse<StrapiPost> = await postsRes.json();

  const projects = projectsJson.data.map((item) => ({
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

  const posts = postsJson.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : '/images/no-image.png',
  }));

  return { projects, posts };
}
```

We are doing the same thing with posts that we did with projects. We fetch from Strapi and then map the data to our own format.

The following:

```
?sort[0]=date:desc&pagination[limit]=3&populate=image
```

Is sorting the data by date in descending order. The [0] is because Strapi allows multi-level sorting using arrays via query strings. So we are saying first sort by the date in desc order. If you wanted secondary sorting by say the title, you could add a [1].

You should not have to change anything else. Unless you want to add the image here. I do not.

That's it! We now have a completely dynamic website with an admin area for adding projects and blog posts. Feel free to build on this from here and make it even better.

You can delete the following files/folders if you want:

- `public/data`
- `app/posts`
- The project images in the `public/images` folder. Keep the `no-image.png` and `profile.jpg`. We are using those.
