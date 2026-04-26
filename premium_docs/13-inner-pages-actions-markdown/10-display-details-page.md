# Display Details Page


```jsx
const BlogPostDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta, markdown } = loaderData;

  return (
    <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
      <h1 className='text-3xl font-bold text-blue-400 mb-2'>
        {postMeta.title}
      </h1>
      <p className='text-sm text-gray-400 mb-6'>
        {new Date(postMeta.date).toLocaleDateString()}
      </p>

      <div className='prose prose-invert max-w-none mb-12'>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

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

We are using the `loaderData` prop to get the postMeta and markdown content. We are rendering the title and date of the blog post. We also show a button to go back to the blog page.

## Styling

You'll notice the content is not syled. We can install the `@tailwindcss/typography` plugin, which adds a `prose` class that provides nice default styles for typographic content like headings, paragraphs, lists, code blocks, and blockquotes.

```bash
npm install -D @tailwindcss/typography
```

Add the following to your `app.css` file:

```css
@plugin "@tailwindcss/typography";
```

That's it. Now you should have nice font sizes and white space in your content. Any time you want to create a new post, you add a new markdown file to the `src/posts` folder and add the meta data to the `posts-meta.json` file.
