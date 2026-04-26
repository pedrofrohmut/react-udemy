# Reusable Pagination

A few lessons ago, we added pagination to the projects page. Now, we want to add pagination to the blog posts page. We can use the Pagination component we created earlier to do this.

Open the `app/routes/blog/index.tsx` file and import the `Pagination` component and the `useState` hook from React:

```jsx
import { useState } from 'react';
import Pagination from '~/components/pagination';
```

Add a piece of state for the current page and a variable for the number of posts per page:

```jsx
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 3;
```

Above the return, add the following code:

```jsx
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 3;

const totalPages = Math.ceil(posts.length / postsPerPage);
const indexOfLast = currentPage * postsPerPage;
const indexOfFirst = indexOfLast - postsPerPage;
const currentPosts = posts.slice(indexOfFirst, indexOfLast);
```

Just like with the projects, we are getting the current posts based on the current page. We are also getting the total number of pages.

## Show Current Posts & Pagination

Now replace the following code:

```jsx
{
  posts.map((post) => <PostCard key={post.slug} post={post} />);
}
```

With this code:

```jsx
<div className='space-y-8'>
  {currentPosts.map((post) => (
    <PostCard key={post.slug} post={post} />
  ))}
</div>;

{
  totalPages > 1 && (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
    />
  );
}
```

Now we are using the pagination. You can change the number of posts per page by changing the `postsPerPage` variable. I will set it to 10. The pagination should then go away because we don't have enough posts to paginate.
