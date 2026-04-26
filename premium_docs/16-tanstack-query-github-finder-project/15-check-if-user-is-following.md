# Check If User Is Following

We want to check if the user is following the user being viewed. If not, they will have a "Follow" button and if so, they will have an "Unfollow" button.

## API Function To Check Follow

Let's open the `api/github.ts` file and add the following function:

```ts
// Check if following a user on github
export const checkIfFollowingUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    }
  );

  if (res.status === 204) {
    return true; // Following
  } else if (res.status === 404) {
    return false; // Not following
  } else {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to check follow status');
  }
};

```

We are sending a request to see if the user from the token is following. We pass the token in the headers. It is also good practice to send `Accept: 'application/vnd.github+json'`. This is just GitHub's preferred JSON format.

The way this endpoint works as seen [here](https://docs.github.com/en/rest/users/followers?apiVersion=2022-11-28#check-if-a-person-is-followed-by-the-authenticated-user) is it returns a `204` if the user is following and a `404` if not. So we want to check for that.

## Get Follow Status

We want to show the follow and unfollow buttons. Open the `src/components/UserCard.tsx` file and add the import the `useQuery` hook along with the `checkIfFollowing` function:

```tsx
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  followGitHubUser,
  unfollowGitHubUser,
  checkIfFollowingUser,
} from '../api/github';

Add this to the top of the function component:

```tsx
// Check if already following
const { data: isFollowing, refetch } = useQuery({
  queryKey: ['follow-status', user.login],
  queryFn: () => checkIfFollowingUser(user.login),
  enabled: !!user.login,
});
```

We are using the `useQuery` hook to check if the user is already following the user. We are passing in the `queryKey` as an array with the first element as `follow-status` and the second element as the user's login. The `queryFn` is the function that will be called to fetch the data. The `enabled` option is set to `!!user.login`, which means that the query will only run if the user login is truthy.

## Show Button

Now we need to show the correct button based on the follow status. We will use the `isFollowing` variable to determine if the user is already following the user.

Add this above the Github profile link and below the bio:

```tsx
<div className='user-card-buttons'>
  <button
    className={`follow-btn ${isFollowing ? 'following' : ''}`}
  >
    {isFollowing ? (
      <>
        <FaUserMinus className='follow-icon' />
        Following
      </>
    ) : (
      <>
        <FaUserPlus className='follow-icon' />
        Follow User
      </>
    )}
  </button>
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
```

Now you should see the follow or unfollow based on the status.
