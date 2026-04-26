# Edit Form

Now we want to be able to edit an idea. We will start by creating a new route and form for editing an idea. We also need to pull in the current idea data to pre-fill the form. We will do that in this lesson and then in the next, we will create the mutation and the request to the API.

## Edit Link

Before we do anything, let's add a link to the edit page in the idea details page. Open the `src/routes/ideas/$ideaId.tsx` file and add the following:

```javascript
<Link
 return (
    <div className='p-4'>
      <Link to='/ideas' className='text-blue-500 underline block mb-4'>
        Back to Ideas
      </Link>

      <h2 className='text-2xl font-bold'>{idea.title}</h2>
      <p className='mt-2'>{idea.description}</p>

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
    </div>
  );
```

Now we have both an edit and delete button in the idea details page. The edit button will take us to the edit page for that idea.

## Create Edit Route

Create a file at `src/routes/ideas/$ideaId/edit.tsx` and add the following imports to it:

```javascript
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  useMutation,
  useSuspenseQuery,
  queryOptions,
} from '@tanstack/react-query';
import { fetchIdea } from '@/api/ideas';
```

## Query Options

Add the query options to fetch the idea above the `Route`:

```javascript
const ideaQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['idea', id],
    queryFn: () => fetchIdea(id),
  });
```

## Loader

Now add the loader with the query:

```javascript
export const Route = createFileRoute('/ideas/$ideaId/edit')({
  component: EditIdeaPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});
```

## Get Data In Component

Now in the `EditIdeaPage` component, get the id from the route, initialize the navigate function and get the idea from the loader data:

```javascript
function EditIdeaPage() {
  const { ideaId } = Route.useParams();
  const navigate = useNavigate();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  return <div>Hello "/ideas/$ideaId/edit"!</div>;
}
```

## Add State

Under that, let's add the state for the form under the `useSuspenseQuery`:

```javascript
const [title, setTitle] = useState(idea.title);
const [summary, setSummary] = useState(idea.summary);
const [description, setDescription] = useState(idea.description);
const [tagsInput, setTagsInput] = useState(idea.tags.join(', '));
```

The reason I used `tagsInput` is because we will be using a string for the input and an array for the state. We will convert it to an array when we submit the form.

## Form

Let's Create the form with the data from the idea:

```javascript
 return (
     <div className='space-y-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Edit Idea</h1>
        <Link
          to='/ideas/$ideaId'
          params={{ ideaId }}
          className='text-sm text-blue-600 hover:underline'
        >
          ← Back To Idea
        </Link>
      </div>
      <form className='space-y-2'>
        <div>
          <label
            htmlFor='title'
            className='block text-gray-700 font-medium mb-1'
          >
            Title
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter idea title'
          />
        </div>

        <div>
          <label
            htmlFor='summary'
            className='block text-gray-700 font-medium mb-1'
          >
            Summary
          </label>
          <input
            id='summary'
            type='text'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Enter idea summary'
          />
        </div>

        <div>
          <label
            htmlFor='body'
            className='block text-gray-700 font-medium mb-1'
          >
            Description
          </label>
          <textarea
            id='body'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Write out the description of your idea'
          />
        </div>

        <div>
          <label
            htmlFor='tags'
            className='block text-gray-700 font-medium mb-1'
          >
            Tags
          </label>
          <input
            id='tags'
            type='text'
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='optional tags, comma separated'
          />
        </div>

        <div className='mt-5'>
          <button
            type='submit'
            className='block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Update Idea
          </button>
        </div>
      </form>
    </div>
  );
}
```

Pretty simple form with the data from the idea. We are using the `onChange` event to update the state with the input value. For the tags, we are splitting the string into an array and trimming the whitespace.

The `split` method is used to split the string into an array of strings that is separated by a comma. The `map` method is used to trim the whitespace from each string in the array. So if they put in for instance ' startup ', it will be trimmed to 'startup'.

Now that we have the form showing the data, we need to create the mutation to update the idea. We will do that in the next lesson.
