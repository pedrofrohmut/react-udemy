# Mutations & Follow User

We are running a query to check if we are following a specific user. Now we need to be able to click the button and make a PUT Request to follow or unfollow the user. This will be done using mutations and this is the whole reason that I added this feature is I didn't only want to show you how to fetch with `useQuery`. I also want to show you how to mutate using `useMutation`.

## Follow User Function

Open the `api/github.ts` file and add the following function:

```ts
// Follow user on Github
export const followGitHubUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json', // Best practice
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to follow user');
  }

  return true;
};
``` 

We have a function to follow a user by making a PUT request to the Github API. Now, let's use that function in a mutation. We will use the `useMutation` hook from TanStack Query to do this.

I want to have the follow button in the `UserCard` component.

Open the `src/components/UserCard.tsx` file and import the following:

```tsx
import { useMutation, useQuery } from '@tanstack/react-query';
```

Add the following mutation to the `UserCard` component above the `return` statement:

```tsx
const followMutation = useMutation({
  mutationFn: () => followGitHubUser(user.login),
  onSuccess: () => {
    console.log(`You have followed ${user.login}`);
    refetch();
  },
  onError: (err: any) => {
    toast.error(err.message);
  },
});
```

Now we can call `followMutation.mutate()` where we want. 

Add the following click handler to the 

```tsx

 <button className={`follow-btn ${isFollowing ? 'following' : ''}` onClick={handleFollow}} disabled={followMutation.isPending}>
    {isFollowing ? (
      <>
        <FaUserMinus className='follow-icon' /> Following
      </>
    ) : (
      <>
        <FaUserPlus className='follow-icon' /> Follow User
      </>
    )}
  </button>
  
```

Now add the `handleFollow` Function:

```ts
  const handleFollow = () => {
    if (isFollowing) {
      // @todo Unfollow
    } else {
      followMutation.mutate();
    }
  };
```

Now when you click the follow button, it should follow that user.