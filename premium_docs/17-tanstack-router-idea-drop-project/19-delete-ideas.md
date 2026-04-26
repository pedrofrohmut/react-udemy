# Delete Ideas

Now lets add a new mutation to delete an idea. We will add a new button to the idea on the details page. This button will call the deleteIdea mutation and pass the idea id to it. We will also add a confirmation dialog to confirm the deletion.

Open the `src/api/ideas.ts` file and add the following function to it:

```javascript
export const deleteIdea = async (ideaId: string): Promise<void> => {
  await api.delete(`/ideas/${ideaId}`);
};
```

## Add Delete Idea Mutation

Open the `src/routes/ideas/$ideaId.tsx` file and add imports for the `useMutation` hook from react query, `useNavigate` hook from react router and the `deleteIdea` function from the api file:

```javascript
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query';
import { fetchIdea, deleteIdea } from '@/api/ideas';
```

In the `IdeaDetailsPage` component above the return statement, add the following code to create a mutation for deleting an idea:

```javascript
const navigate = useNavigate();

const { mutateAsync: deleteMutate, isPending } = useMutation({
  mutationFn: () => deleteIdea(ideaId),
  onSuccess: () => {
    navigate({ to: '/ideas' });
  },
});
```

Now add the button under the description paragraph in the return statement:

```javascript
<button
  onClick={handleDelete}
  disabled={isPending}
  className='text-sm bg-red-600 hover:bg-red-700 text-white mt-4 px-4 py-2 rounded transition disabled:opacity-50'
>
  {isPending ? 'Deleting...' : 'Delete'}
</button>
```

Add a `handleDelete` function to handle the delete button click:

```javascript
const handleDelete = async () => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this idea?'
  );
  if (confirmDelete) {
    await deleteMutate();
  }
};
```

This will create a button that will call the deleteIdea mutation.

Try it out. It should delete the idea and redirect you to the ideas list page.

You should also see a confirmation dialog before deleting the idea.
