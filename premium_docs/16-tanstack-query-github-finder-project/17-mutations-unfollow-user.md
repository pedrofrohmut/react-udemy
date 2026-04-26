# Mutations - Unfollow User

Now we want to create a function and mutation to unfollow a user.

Open the `api/github.ts` file and add the following function:

```ts
// Unfollow user on Github
export const unfollowGithubUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to unfollow user');
  }

  return true;
};
```

Now add the following mutation in the `UserCard` component:

```ts
  // Mutation to unfollow the user
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowGithubUser(user.login),
    onSuccess: () => {
      console.log(`You are no longer following ${user.login}`);
      refetch();
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

```

Add a click handler to the button as well as a `disabled` attribute if it is pending:

```ts
  <button
          disabled={followMutation.isPending || unfollowMutation.isPending}
          onClick={handleFollow}
          className={`follow-btn ${isFollowing ? 'following' : ''}`}
        >
```

Add the `handleFollow` function above the return statement:

```ts
  const handleFollow = () => {
    if (isFollowing) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };
```

Now you can click the button to follow and unfollow.