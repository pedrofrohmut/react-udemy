# Fetching Blog Posts

In this section, we will fetch the blog posts from the Strapi API and display them on our React application, but first, we are going to open the `types.ts` file.

## Post Types

Before we fetch the data, let's make sure we have the correct types in the `/app/types.ts` file. We now have an image. We are going to keep the `PostMeta` type and then later we will add a `Post` type that will inherit all the PostMeta but also it will have a body. I'll explain why later. For now, your `PostMeta` type should look like this:

```ts
export type PostMeta = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
};
```

We now have an image property.

The id should be a number. If you had string, change it. We are also adding an image.

## Strapi Post Type

We also want to add a type for the post we get from Strapi.

Add the following type to the `/app/types.ts` file:

```ts
export type StrapiPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
};
```

We need this because Strapi has a different structure for the image. It has a `formats` property that contains the different sizes of the image.

Now we can start to fetch the posts from Strapi.


Open the `app/routes/blog/index.tsx` file and import the types we need:

```tsx
import type { PostMeta, StrapiResponse, StrapiPost } from '~/types';
```

Replace the loader with this one:

```tsx
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const json: StrapiResponse<StrapiPost> = await res.json();

  const posts = json.data.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : '/images/no-image.png',
  }));

  return { posts };
}
```

This loader fetches the posts from the Strapi API and returns them in a format that we can use in our component. We sorted the posts by date in descending order. We populate the image field so we can get the image URL. We also check if the image URL is available; if not, we use a default image.

You should see the posts from Strapi. You may need to restart the server.

## Add Image To Post

Let's add the image to the output. Open the `app/components/PostCard.tsx` file and add the image to the component:

```tsx
import { Link } from 'react-router';
import type { PostMeta } from '~/types';

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article key={post.slug} className='bg-gray-800 p-6 rounded-lg shadow'>
      <h3 className='text-2xl font-semibold text-blue-400'>{post.title}</h3>
      <p className='text-sm text-gray-400 mb-2'>
        {new Date(post.date).toLocaleDateString()}
      </p>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className='w-full h-48 object-cover rounded mb-4'
        />
      )}
      <p className='text-gray-300 mb-4'>{post.excerpt}</p>
      <Link
        to={`/blog/${post.slug}`}
        className='text-blue-300 hover:underline text-sm'
      >
        Read More →
      </Link>
    </article>
  );
};

export default PostCard;
```

The filter should still work as expected. You can now see the image in the blog posts.

In the next lesson, we will do the individual post page.
