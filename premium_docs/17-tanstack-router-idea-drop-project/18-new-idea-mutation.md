# Create New Idea Mutation

Now we want to move on with our project and create new ideas. We will use the `useMutation` hook from TanStack Query to handle the mutation.

## API Function

Let's create the API function that will handle the POST request. Open the file `src/api/ideas.ts` and add the following code:

```tsx
export const createIdea = async (newIdea: {
  title: string;
  summary: string;
  description: string;
  tags: string[];
}): Promise<Idea> => {
  const res = await api.post('/ideas', {
    ...newIdea,
    createdAt: new Date().toISOString(),
  });

  return res.data;
};
```

We are using axios to make the POST request to the `/ideas` endpoint. We are passing the new idea data and setting the `createdAt` date to the current date. The response will be the created idea.

Open the `src/routes/ideas/new.tsx` and import the api function:

```tsx
import { createIdea } from '@/api/ideas';
```

## Create Mutation

Now we will create the mutation using the `useMutation` hook. The mutation will call the `createIdea` function and handle the success and error cases. Add the following code inside the `NewIdeaPage` component:

```tsx
const { mutateAsync, isPending } = useMutation({
  mutationFn: createIdea,
  onSuccess: () => {
    navigate({ to: '/ideas' });
  },
});
```

We are using `mutateAsync` to call the mutation function. The `onSuccess` callback will be called when the mutation is successful. We are setting the `newIdea` state with the created idea and showing the modal.

## Handle Submission

Add the following function to handle the form submission:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!title.trim() || !summary.trim() || !description.trim()) {
    alert('Please fill in all fields');
    return;
  }

  try {
    await mutateAsync({
      title,
      summary,
      description,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ''),
    });
  } catch (error) {
    console.error(error);
    alert('Something went wrong.');
  }
};
```

We are preventing the default form submission and checking if the fields are filled. If they are, we call the `mutateAsync` function with the new idea data. If there is an error, we log it to the console and show an alert.

The tags are split by commas and trimmed and then put into an array.
If there are any empty tags, they are filtered out.

We will also add the `onSubmit` event to the form:

```tsx
 <form onSubmit={handleSubmit} className='space-y-4'>
```

## Pending Button

Let's show a pending button while the mutation is in progress. We can do this by adding a `disabled` attribute to the button:

```tsx
<button
  type='submit'
  className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
  disabled={isPending}
>
  {isPending ? 'Creating...' : 'Create Idea'}
</button>
```

Now when you submit the form, it will call the `handleSubmit` function and create a new idea. You will be redirected to the ideas list page after the mutation is successful.

## Order By Date

Let's make it so that the ideas are ordered by date. We will do this in the `src/routes/ideas/index.tsx` file. Open the file and change this line:

```tsx
const { data: ideas } = useSuspenseQuery(ideaQueryOptions());
```

To this:

```tsx
const { data } = useSuspenseQuery(ideaQueryOptions());
const ideas = [...data].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
```

This will take the data and spread it into a new array. Then we will sort the array by the `createdAt` date in descending order. This way, the latest ideas will be shown first.
