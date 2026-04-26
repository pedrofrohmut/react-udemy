# Single Post Page

We have the blog page working with the JSON meta data. Now we need to create a single post page. We have the blog post previews linking to the single post page using the slug. We need to create a dynamic route for the single post page.

Let's start by creating a new file at `app/routes/blog/details.tsx`. This file will be used to render the single post page.

Just add the following for now:

```jsx
const BlogPostDetailsPage = () => {
  return (
    <>
      <h1>BlogPost</h1>
    </>
  );
};

export default BlogPostDetailsPage;
```

Now let's create a dynamic route for the single post page. Open the `app/routes.ts` file and add the following route:

```jsx
  route('blog/:slug', './routes/blog/details.tsx'),
```

We use the `:slug` parameter to create a dynamic route. This parameter will be used to fetch the blog post data from the JSON file.

## React Markdown

We will be using React Markdown to render the markdown content. We need to install it first. Run the following command to install it:

```bash
npm install react-markdown
```

In the `app/routes/blog/details.tsx` page, add the following imports:

```jsx
import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostMeta } from '~/types';
```

We are bringing in the blogIndex so that we can get the blog post data from it.

## Loader & URL Params

We can use the loader to load the blog posts. We can also get the slug from the URL params. Add the following code to the `app/routes/blog/details.tsx` file:

```jsx
export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  console.log(slug);

  return {};
}
```

## Fetching the Blog Post Data

We need to fetch both the blog post meta and the content from the markdown file. Add this code to the loader:

```jsx
export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const url = new URL('/data/posts-meta.json', request.url);
  const res = await fetch(url.href);

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const index = await res.json();

  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) {
    throw new Response('Not found', { status: 404 });
  }

  // Dynamically import raw markdown content
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}
```

We are first getting the slug from the URL params. Then we are fetching the blog post meta data from the JSON file. We are using the slug to find the blog post meta data. If we don't find it, we throw a 404 error.

Then we are dynamically importing the markdown content using the slug. We are using the `?raw` query parameter to get the raw content of the markdown file. This will allow us to render the markdown content using React Markdown.

We return both the postMeta and the markdown content from the loader. We will use this data in the component to render the blog post.

## Getting The Data Into The Component

We can get the data with the following code:

```jsx
type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
};


const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;

  console.log(postMeta, markdown);

  return <>Blog</>;
};
```

You should see the data logged to the console.
