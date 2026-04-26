# Pagination Component

Right now we have all the pagination stuff in the `app/routes/projects/index.tsx` file. But we can make it a little cleaner by moving the pagination buttons to their own component.

Create a new file called `Pagination.tsx` in the `app/components` directory and add the following code:

```tsx
type PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null; // Don't render if only one page

  return (
    <div className='flex justify-center gap-2 mt-8'>
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === idx + 1
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-200'
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
```

We are taking in three props: `totalPages`, `currentPage`, and `onPageChange`. The `onPageChange` prop is a function that will be called when the user clicks on a page number. We are just moving the JSX from the `renderPagination` function in the `app/routes/projects/index.tsx` file to this new component.

Now we need to import the `Pagination` component into the `app/routes/projects/index.tsx` file and use it. First, import the component at the top of the file:

```tsx
import Pagination from '~/components/pagination';
```

Delete the `renderPagination` function from the `app/routes/projects/index.tsx` file.

Then, replace the `renderPagination` function with the `Pagination` component in the return statement:

```tsx
<Pagination
  totalPages={totalPages}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
/>
```

It should still work the same way. It is just a bit cleaner now.
