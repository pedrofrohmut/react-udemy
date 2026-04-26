# Fetch Individual Post

In this lesson, we will learn how to fetch an individual post from the Strapi API. We are going to hold off on the body for now though because we have to render it a specific way, which I will go over in the next lesson.

Open the `app/routes/blog/details.tsx` and import the types:

```tsx
import type { StrapiResponse, StrapiPost, PostMeta } from '~/types';
```

Replace the `loader` function with the following code:

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const { slug } = params;

  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/posts?filters[slug][$eq]=${slug}&populate=image`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  const json: StrapiResponse<StrapiPost> = await res.json();

  if (!json.data.length) {
    throw new Response('Not Found', { status: 404 });
  }

  const item = json.data[0];

  const post: PostMeta = {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : '/images/no-image.png',
  };

  return { post };
}
```

We are getting the `slug` from the `params` and using it to fetch the post from the Strapi API. We are also populating the `image` field. If the response is not ok, we throw an error. If the post is not found, we return a 404 response. Finally, we create a `post` object with the required fields and return it.

## Update the Component

In the output, we were using markdown. We need to change that to use the data from the api, which is being returned from the loader function.

Replace what you have with the following code:

```tsx
const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { post } = loaderData;

  return (
    <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
      <h1 className='text-3xl font-bold text-blue-400 mb-2'>{post.title}</h1>
      <p className='text-sm text-gray-400 mb-6'>
        {new Date(post.date).toLocaleDateString()}
      </p>
      <img
        src={post.image}
        alt={post.title}
        className='w-full h-64 object-cover mb-4'
      />

      <div className='prose prose-invert max-w-none mb-12'>The Body</div>

      <div className='text-center'>
        <Link
          to='/blog'
          className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
        >
          ← Go Back to Posts
        </Link>
      </div>
    </div>
  );
};
```

Notice I just used the text `The Body` for now. This is because since we used a rich text editor in Strapi, we need to do a couple things to render the body correctly. We will do that in the next lesson.
