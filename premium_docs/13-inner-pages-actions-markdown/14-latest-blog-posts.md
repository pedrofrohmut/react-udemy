# Latest Posts

Let's add a new component on the homepage for the latest posts.

## Fetching Posts

First, we need to actually get the blog posts on the homepage. Let's do that in the loader. Since we are already getting the projects, we will use `promise.all`, which allows us to fetch multiple data sources concurrently rather than sequentially, improving performance by running the requests in parallel.

Add the following to the `app/routes/home/index.tsx` loader:

```ts
export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);

  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL('/posts-meta.json', url)),
  ]);

  if (!projectRes.ok || !postRes.ok) {
    throw new Error('Failed to fetch projects or posts');
  }

  const [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json(),
  ]);

  return { projects, posts };
}
```

Now we are returning both projects and posts.

In the component function, add the following:

```ts 
const HomePage = ({ loaderData }: Route.ComponentProps) => {
   const { projects, posts } = loaderData;
```

Create a new file at `src/components/LatestPosts.js`:

```jsx
import { Link } from 'react-router';
import type {PostMeta} from '~/types';


type LatestPostsProps = {
  posts: PostMeta;
  limit: number;
}

const LatestPosts = ({ posts, limit = 3 }:LatestPostsProps) => {
  const sorted = [...posts].sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const latest = sorted.slice(0, limit);

  return (
    <section className='max-w-6xl mx-auto px-6 py-12'>
      <h2 className='text-2xl font-bold mb-6 text-white'>
        🆕 Latest Posts
      </h2>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {latest.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className='block p-4 border border-gray-700 rounded-lg bg-gray-800 hover:shadow-md transition'
          >
            <h3 className='text-lg font-semibold text-blue-400 mb-1'>
              {post.title}
            </h3>
            <p className='text-sm text-gray-300'>
              {post.excerpt}
            </p>
            <span className='block mt-3 text-xs text-gray-400'>
              {new Date(post.date).toLocaleDateString()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
```

Open the `src/pages/home.js` file and import the `LatestPosts` component:

```jsx
import LatestPosts from '../components/LatestPosts';
```

Add the following under the `<AboutPreview />` component or whereever you want to put it:

```ts
 <LatestPosts posts={posts} />
```