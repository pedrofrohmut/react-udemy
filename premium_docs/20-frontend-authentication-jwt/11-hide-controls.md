# Hide Controls

Right now, the edit and delete buttons are visible to all users on all ideas. They will not work if the user is not logged in and owns the idea, but we still don't want them to be visible. We can hide them by checking if the user is logged in and if they own the idea. If they do, we will show the buttons. If not, we will hide them.

Open the `src/routes/ideas/$ideaId/index.tsx` file and bring in the `useAuth` hook at the top of the file:

```tsx
import { useAuth } from '@/context/AuthContext';
```

Then, inside the `Idea` component, call the `useAuth` hook to get the user:

```tsx
const { user } = useAuth();
```

Now wrap the buttons like this:

```tsx
{
  user && user.id === idea.user && (
    <>
      {/* Edit link */}
      <Link
        to='/ideas/$ideaId/edit'
        params={{ ideaId }}
        className='inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition'
      >
        Edit
      </Link>

      {/* Delete button */}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className='text-sm bg-red-600 hover:bg-red-700 text-white mt-4 px-4 py-2 rounded transition disabled:opacity-50'
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </>
  );
}
```

Now only the logged in user will see their own edit and delete buttons. If the user is not logged in, they will not see the buttons at all.
