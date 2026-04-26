# Making Queries

Now that we have TanStack Query setup, we can start using it. 

## User Search Component

I want to have a user search component for searching Github users. Let's create that at `src/components/UserSearch.tsx`.

Let's bring in the `useQuery` hook from TanStack Query as well as the `useState` hook from React.

```tsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
```

Let's create a component function with some state:

```tsx
const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');

  return <></>;
};

export default UserSearch;
```

We have two pieces of state here. The first is the `username` which will be updated as the user types in the input field. The second is `submittedUsername` which will be set when the user submits the form.

## The Form

Let's creat the form output. Add this to the return:

```tsx
return (
  <>
    <form className='form'>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter GitHub username'
      />
      <button type='submit'>Search</button>
    </form>
  </>
);
```

Let's import this file into the `src/App.tsx` file and add it to the return statement:

```tsx
import UserSearch from './components/UserSearch';

const App = () => {
  return (
    <div className='container'>
      <h1>GitHub User Search</h1>
      <UserSearch />
    </div>
  );
};

export default App;
```

Now you should see the input field and button on the page.

## Using `useQuery`

Let's handle the submission and the query. We will use the `useQuery` hook to fetch the data from the GitHub API.

Add the following above the return statement in the `UserSearch` component:

```tsx
const { data, isLoading, isError, error } = useQuery({
  queryKey: ['users', submittedUsername],
  queryFn: async () => {
    const res = await fetch(
      `https://api.github.com/users/${submittedUsername}`,
      {
     headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
      },
    }
    );
    if (!res.ok) {
      throw new Error('User not found');
    }

    const data = await res.json();

    console.log(data)l

    return data;
  },
  enabled: !!submittedUsername,
});
```

Let's go over this line for line.

- We get the `data`, `isLoading`, and `isError` from the `useQuery` hook. This is pretty self-explanatory. The data is what we are fetching, in this case, github user data. The `isLoading` and `isError` are booleans that tell us if the query is loading or if there was an error. When we do this manually with the `useEffect` hook, we have to manage the loading and error states ourselves. With TanStack Query, it does this for us.
- The `queryKey` is an array that uniquely identifies the query. We are saying cache and track this query using the key: `['users', 'whatever-username']`. So, 'users' is the resource type, and submittedUsername is the unique identifier (like an ID) and it will refetch when it changes. So when we click the button, it will refetch the data with the new username.
- The `queryFn` is the function that will be called to fetch the data. This is an async function that fetches the data from the GitHub API. If the response is not ok, we throw an error. Otherwise, we return the JSON data.
- The `enabled` option is a boolean that tells the query when to run. In this case, we only want to run the query when the `submittedUsername` is not an empty string. This prevents the query from running on initial render and only runs when the user submits the form.
- The `!!submittedUsername` is a double negation that converts the string to a boolean. If the string is empty, it will be false. If it has a value, it will be true.

## Handling the Form Submission

Now, let's add the form submission handler. We want to prevent the default form submission and set the `submittedUsername` state to the `username` state.

We can do this by adding an `onSubmit` handler to the form:

```tsx

  <form onSubmit={handleSubmit} className="form">
  ```

Add this function to the component:

```tsx
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSubmittedUsername(username.trim());
};
```

So all we are doing when we submit the form is preventing the default form submission and setting the `submittedUsername` to the trimmed value of the `username` state. This will trigger the query to run. So no `useEffect` hook is needed here. No function to call. Just set the state and TanStack Query will take care of the rest.

## Using the Data

Now let's use the data in the response. We can do this by adding some conditional rendering to the return statement.

```tsx
return (
  <>
    <form onSubmit={handleSubmit} className='form'>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter GitHub username'
      />
      <button type='submit'>Search</button>
    </form>

    {isLoading && <p className='status'>Loading...</p>}
    {error && <p className='status error'>{error.message}</p>}

    {data && data && (
      <div className='user-card'>
        <img src={data.avatar_url} alt={data.name} className='avatar' />
        <h2>{data.name || data.login}</h2>
        <p className='bio'>{data.bio}</p>
        <a
          href={data.html_url}
          target='_blank'
          rel='noopener noreferrer'
          className='profile-btn'
        >
          View GitHub Profile
        </a>
      </div>
    )}
  </>
);
```

Now you should see the loading state when you submit the form. If there is an error, it will show the error message. If the data is returned, it will show the user card with the avatar, name, bio, and a link to the GitHub profile.
