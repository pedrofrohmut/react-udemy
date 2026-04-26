# Code Clean Up

Before we move on, I just want to clean up our code a bit. First we will clean up the query a bit by putting the request in it's own function. This will make it easier to read and maintain. Then we will move the card to it's own component. We also need to add a user type.

In the `src/components/UserSearch.tsx` file, create a new function called `fetchUsers` that takes a search term as an argument and returns the result of the query. This will make it easier to read and maintain.

```tsx
const fetchGitHubUser = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error('User not found');

  const data = await res.json();
  return data;
};
```

Then, update the `useQuery` hook to use this new function:

```tsx
const { data, isLoading, isError, error } = useQuery({
  queryKey: ['users', submittedUsername],
  queryFn: () => fetchGitHubUser(submittedUsername),
  enabled: !!submittedUsername,
});
```

This makes the code cleaner and easier to read. It also allows us to reuse the `fetchGitHubUser` function in other parts of the app if needed.

## Move To New File

To make this less redundant in the future, we will move the `fetchGitHubUser` function to a new file. Create a new file at `src/api/github.ts` and add the following code:

```tsx
export const fetchGitHubUser = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) {
    throw new Error('User not found');
  }
  return res.json();
};
```

Delete the `fetchGitHubUser` function from the `UserSearch` component and import it from the new file.

```tsx
import { fetchGitHubUser } from '../api/github';
```

## `UserCard` Component

Let's also move the card to it's own component. I also want to add a github icon to the button.

Create a new file at `src/components/UserCard.tsx` and add the following code:

```tsx
import { FaGithub } from 'react-icons/fa';

const UserCard = ({ user }) => {
  return (
    <div className='user-card'>
      <img src={user.avatar_url} alt={user.name} className='avatar' />
      <h2>{user.name || user.login}</h2>
      <p className='bio'>{user.bio}</p>
      <a
        href={user.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className='profile-btn'
      >
        <FaGithub />
        View GitHub Profile
      </a>
    </div>
  );
};

export default UserCard;
```

Then, import this component in the `UserSearch` component and use it to display the user data:

```tsx
import UserCard from './UserCard';

//...

{
  data && data && <UserCard user={data} />;
}
```

## User TypeScript

Create a file at `src/types.ts` and add the following code:

```tsx
export type GitHubUser = {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
};
```

Then, import this type in the `UserCard` component and use it to type the user prop:

```tsx
import type { GitHubUser } from '../types';
import { FaGithub } from 'react-icons/fa';

const UserCard = ({ user }: { user: GitHubUser }) => {
  return (
    <div className='user-card'>
      <img src={user.avatar_url} alt={user.name} className='avatar' />
      <h2>{user.name || user.login}</h2>
      <p className='bio'>{user.bio}</p>
      <a
        href={user.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className='profile-btn'
      >
        <FaGithub />
        View GitHub Profile
      </a>
    </div>
  );
};

export default UserCard;
```
