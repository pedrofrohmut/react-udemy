# Blog Post Filter

I want to be able to filter blog posts by keywords that match in the title or excerpt.

We will create a separate component for this. Create a file at `app/components/PostFilter.tsx` and add the following code:

```tsx
type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
  return (
    <div className='mb-6'>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder='Search posts...'
        className='w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
  );
};

export default PostFilter;
```

We created an interface for the props. The `PostFilter` component takes in a `searchQuery` and an `onSearchChange` function. The `onSearchChange` function will be called whenever the input value changes.

Now, we can use this component in our blog page. Open the `app/routes/blog/index.tsx` file and import the `PostFilter` component:

```tsx
import PostFilter from '~/components/PostFilter';
```

Add a piece of state to manage the search query:

```tsx
const [searchQuery, setSearchQuery] = useState('');
```

In the `BlogPage` component, add this under the `postsPerPage` variable:

```tsx
const filteredPosts = posts.filter((post) => {
  const query = searchQuery.toLowerCase();
  return (
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query)
  );
});
```

This will filter the posts based on the search query. If the title or excerpt includes the search query, it will be included in the filtered posts.

Now update the values below it to use `filteredPosts` instead of `posts`:

```tsx
const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
const indexOfLast = currentPage * postsPerPage;
const indexOfFirst = indexOfLast - postsPerPage;
const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
```

## Add the PostFilter Component

Add the component under the heading in the return statement:

```tsx
<PostFilter
  searchQuery={searchQuery}
  onSearchChange={(query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when filtering
  }}
/>
```

When we type, the `onSearchChange` function will be called, updating the `searchQuery` state. The `setCurrentPage(1)` will reset the pagination to the first page whenever we change the search query.

You can also update the output to say not posts found if the filtered posts are empty:

```tsx
<div className='space-y-8'>
  {currentPosts.length === 0 ? (
    <p className='text-gray-400 text-center'>No posts found.</p>
  ) : (
    currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
  )}
</div>
```

In the next lesson, we will show the latest posts on the home page.
