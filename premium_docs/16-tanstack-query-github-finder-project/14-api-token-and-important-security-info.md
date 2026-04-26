# Github Token & Important Security Information

Up to this point, we have used TanStack Query to fetch data from the GitHub API. I now want to get into mutations and the example I want to use is adding a follow button on the user profile card. However, the way that this will work is we need to generate a token that will be connected to our account. This means that when we click follow, it will always make the account from the token follow the user. So you would not push that functionality to production. If you did, then you are allowing other people to follow and unfollow accounts for your Github account.

With that said, if you want to make this project live, then this is as far as you should go. Otherwise, you should only run this project locally and not host it live on the web. We are also storing our token on the client. So you would not want that to be accessible either. 

You could implement some kind of OAuth login where the user can verify their account and then follow from their own Github, but you would have a backend for that and that is beyond what we have learned so far. So from this point on, for this project, keep it local.

## Github Personal Token

In order for our app to know which account to follow from, we need to add a personal token to the headers. It is a way to authorize who we are.

To create a token, go to `https://github.com/settings/tokens` and create a new token.

Under "Permissions", select `Read and write` for the `Follow` and `Profile` permission. 

Just for this course and for learning purposes, we will add the token to the environment variables. Copy the token and paste it in your `.env` file as `VITE_GITHUB_API_TOKEN`. Make sure to add the `.env` file to your `.gitignore` file.

Open the `.env` file and add the following:

```env
VITE_GITHUB_API_TOKEN="ghp_pQiJPBN6hFsmfMLnfdfdfa7OmAz5H918IhSH"
```

In the next lesson, we will check if the user is following the user being viewed.

Now we can send this in the header authorization.

## API Function

Let's create a function to follow the user. Open the `src/api/github.ts` file and add the following function:


```ts
export const followGitHubUser = async (username: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) throw new Error('Failed to follow user');

  return true;
};
```

Add it to the other API functions as well.

In the next lesson, we will add the mutation to the app. We will use the `useMutation` hook to create a mutation. We will also add a button to follow the user. So let's move on to the next lesson.
