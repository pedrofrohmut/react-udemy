# Input Dropdown Filter

What I would like to do next is have a dropdown in the input field that allows us to filter the results. So when we type, TanStack Query will fetch the users that match what we type in the input field.

We don't to send a request with every single keystroke. We would probably run into rate limiting issues. So we will use a technique called debouncing to wait until the user has stopped typing for a certain amount of time before sending the request.

Let's start by creating a new api function that makes a request to get users by matching a query. Open the `src/api/github.ts` file and add the following function:

```ts
export const searchGitHubUsers = async (query: string) => {
  const res = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`);
  if (!res.ok) {
    throw new Error('Failed to search users');
  }
  const data = await res.json();
  return data.items;
};
```

This function will make a request to the GitHub API to search for users that match the query. It will return the items from the response, which are the users that match the query.

Add the following state to the `UserSearch` component:

```tsx
const [debouncedUsername] = useDebounce(username, 300);
const [showSuggestions, setShowSuggestions] = useState(false);
```

`debouncedUsername` will be the value of the input field after it has been debounced. The `300` is the amount of time in milliseconds to wait before sending the request. You can adjust this value to make it longer or shorter depending on your needs.

The `showSuggestions` state will be used to show or hide the suggestions dropdown.

## Debounceing

Like I said, we are going to use a technique called debouncing to wait until the user has stopped typing for a certain amount of time before sending the request. There is a package we can use to make this easier called `use-debounce`. Let's install it:

```bash
npm install use-debounce
```

Add the following imports at the top of the `UserSearch.tsx` file:

```tsx
import { fetchGitHubUser, searchGitHubUsers } from '../api/github';
import { useDebounce } from 'use-debounce';
import type { GitHubUser } from '../types';
```

## Create a New Query

Create a new query with TanStack:

```tsx
// Fetch suggestions from GitHub's search API
const { data: suggestions } = useQuery({
  queryKey: ['github-user-suggestions', debouncedUsername],
  queryFn: () => searchGitHubUsers(debouncedUsername),
  enabled: debouncedUsername.length > 1,
});
```

This query will fetch the users that match the query. We are using the `enabled` option to only run the query if the `debouncedUsername` is longer than 1 character. This will prevent the query from running if the user has not typed anything or has typed less than 2 characters.

## Render the Dropdown

Let's render the suggestion dropdown here first and then we'll create a separate component for it.

Add a `div` around the input field and add the following code:

```tsx
<div className='dropdown-wrapper'>
  <input
    type='text'
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder='Enter GitHub username'
  />
</div>
```

Now, within the `dropdown-wrapper` div, add the following code under the input:

```tsx
{
  showSuggestions && suggestions?.length > 0 && (
    <ul className='suggestions'>
      {suggestions.slice(0, 5).map((user: GitHubUser) => (
        <li
          key={user.login}
          onClick={() => {
            setUsername(user.login);
            setShowSuggestions(false);

            if (submittedUsername !== user.login) {
              setSubmittedUsername(user.login);
            } else {
              refetch(); // force fetch again if same user
            }

            setRecentUsers((prev) => {
              const updated = [
                user.login,
                ...prev.filter((u) => u !== user.login),
              ];
              return updated.slice(0, 5);
            });
          }}
        >
          <img src={user.avatar_url} alt={user.login} className='avatar-xs' />
          {user.login}
        </li>
      ))}
    </ul>
  );
}
```

This will render the suggestions in a dropdown below the input field. We are checking if `showSuggestions` is true and if there are any suggestions. If there are, we will render the suggestions in a list.

When we click on a suggestion, we will set the `username` to the suggestion and hide the dropdown.

We are also checking if the `submittedUsername` is not the same as the suggestion. If it is not, we will set the `submittedUsername` to the suggestion. If it is, we will force a refetch of the data.

The `refetch` is a function that is returned from the `useQuery` hook. It will refetch the data for the query. We need to get this from the `useQuery` hook. So let's add it to the destructuring:

```tsx
const {
  data: userData,
  isLoading,
  error,
  refetch, // Add this line
} = useQuery({
  queryKey: ['users', submittedUsername],
  queryFn: () => fetchGitHubUser(submittedUsername),
  enabled: !!submittedUsername,
});
```

We are also setting the `recentUsers` state to the suggestions. We are using the `filter` method to remove the user from the list if it is already in the list. Otherwise, we could have the same user in the recents multiple times. We are also using the `slice` method to limit the number of users to 5.

We are rendering the users image and login in the dropdown.

Here is the final code for now:

```tsx
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import UserCard from './UserCard';
import RecentSearches from './RecentSearches';
import { fetchGitHubUser, searchGitHubUsers } from '../api/github';

const UserSearch = () => {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem('recentUsers');
    return stored ? JSON.parse(stored) : [];
  });

  const [debouncedUsername] = useDebounce(username, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch the selected user's data
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users', submittedUsername],
    queryFn: () => fetchGitHubUser(submittedUsername),
    enabled: !!submittedUsername,
  });

  // Fetch suggestions from GitHub's search API
  const { data: suggestions } = useQuery({
    queryKey: ['github-user-suggestions', debouncedUsername],
    queryFn: () => searchGitHubUsers(debouncedUsername),
    enabled: debouncedUsername.length > 1,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;

    setSubmittedUsername(trimmed);

    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];
      return updated.slice(0, 5);
    });
  };

  useEffect(() => {
    localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
  }, [recentUsers]);

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <div className='dropdown-wrapper'>
          <input
            type='text'
            value={username}
            onChange={(e) => {
              const val = e.target.value;
              setUsername(val);
              setShowSuggestions(val.trim().length > 1);
            }}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 100);
            }}
            placeholder='Enter GitHub username'
          />

          {showSuggestions && suggestions?.length > 0 && (
            <ul className='suggestions'>
              {suggestions.slice(0, 5).map((user: any) => (
                <li
                  key={user.id}
                  onClick={() => {
                    setUsername(user.login);
                    setShowSuggestions(false);

                    if (submittedUsername !== user.login) {
                      setSubmittedUsername(user.login);
                    } else {
                      refetch(); // force fetch again if same user
                    }

                    setRecentUsers((prev) => {
                      const updated = [
                        user.login,
                        ...prev.filter((u) => u !== user.login),
                      ];
                      return updated.slice(0, 5);
                    });
                  }}
                >
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className='avatar-xs'
                  />
                  {user.login}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type='submit'>Search</button>
      </form>

      {isLoading && <p className='status'>Loading...</p>}
      {error && <p className='status error'>{error.message}</p>}

      {userData && <UserCard user={userData} />}

      {recentUsers.length > 0 && (
        <RecentSearches users={recentUsers} onSelect={setSubmittedUsername} />
      )}
    </>
  );
};

export default UserSearch;
```
