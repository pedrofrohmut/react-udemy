# Display Post Meta


Now we need to render the output of the posts. We will use the `Link` component to link to the post page. Add the following code inside the `return` statement:

```tsx
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData as { posts: PostMeta[] };

  return (
    <section className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>
      {posts.map((post) => (
        <article key={post.slug} className='bg-gray-800 p-6 rounded-lg shadow'>
          <h3 className='text-2xl font-semibold text-blue-400'>{post.title}</h3>
          <p className='text-sm text-gray-400 mb-2'>
            {new Date(post.date).toLocaleDateString()}
          </p>
          <p className='text-gray-300 mb-4'>{post.excerpt}</p>
          <Link
            to={`/blog/${post.slug}`}
            className='text-blue-300 hover:underline text-sm'
          >
            Read More →
          </Link>
        </article>
      ))}
    </section>
  );
};
```

Now you should see the posts listed on the blog page. Each post has a title, date, excerpt, and a link to read more. The posts are styled with Tailwind CSS to look nice and clean.

Next, we will create a card component for the posts.

## PostCard Component

Let's create a post card component to display the blog posts on the blog page.

Create a new file at `app/components/PostCard.tsx` and add the following code:

```jsx
import { Link } from 'react-router';
import type { PostMeta } from '~/types';

const PostCard = ({ post }: { post: PostMeta }) => {
  return (
    <article key={post.slug} className='bg-gray-800 p-6 rounded-lg shadow'>
      <h3 className='text-2xl font-semibold text-blue-400'>{post.title}</h3>
      <p className='text-sm text-gray-400 mb-2'>
        {new Date(post.date).toLocaleDateString()}
      </p>
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

Now bring it into the `BlogPage` component. Open the `app/routes/blog/index` file and import the `PostCard` component:

```jsx
import PostCard from '~/components/PostCard';
```

Now replace the markup in the list to use the `PostCard` component:

```jsx
const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData as { posts: PostIndex[] };

  return (
    <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};
```
