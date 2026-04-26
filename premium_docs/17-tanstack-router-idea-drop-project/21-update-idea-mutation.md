# Update Idea Mutation

We now have the form to edit the idea, but we need to add the mutation to update the idea in API.

Let's start with the API. Open the `src/api/ideas.ts` file and add the following function to it:

```javascript
// Update an idea
export const updateIdea = async (
  ideaId: string,
  updatedData: {
    title: string,
    summary: string,
    description: string,
    tags: string[],
  }
): Promise<Idea> => {
  const res = await api.put(`/ideas/${ideaId}`, updatedData);
  return res.data;
};
```

We are sending a PUT request to the API with the updated data. The API will then update the idea in the database and return the updated idea.

Import the `updateIdea` function in the `src/routes/ideas/$ideaId/edit.tsx` file:

```javascript
import { fetchIdea, updateIdea } from '@/api/ideas';
```

## Add Update Idea Mutation

Add the following mutation below the state values in the `EditIdeaPage` component:

```javascript
const { mutateAsync, isPending } = useMutation({
  mutationFn: () =>
    updateIdea(ideaId, {
      title,
      summary,
      description,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean), // remove empty strings
    }),
  onSuccess: () => {
    navigate({ to: '/ideas/$ideaId', params: { ideaId } });
  },
});
```

We are just passing the updated data to the `updateIdea` function and navigating back to the idea details page on success.

## Add Form Submit Handler

Now add the following function to handle the form submission:

```javascript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await mutateAsync();
};
```

This will call the mutation when the form is submitted.

Add the `handleSubmit` function to the form element:

```javascript
<form onSubmit={handleSubmit} className='space-y-4'>
```

Add the `disabled` attribute to the submit button to disable it when the mutation is pending:

```javascript
<button
  type='submit'
  disabled={isPending}
  className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded disabled:opacity-50'
>
  {isPending ? 'Updating...' : 'Update Idea'}
</button>
```

You should now be able to create, read, update and delete ideas in the app.

The next section will be a bonus section where we will create a backend for this project using Node.js and Express.
