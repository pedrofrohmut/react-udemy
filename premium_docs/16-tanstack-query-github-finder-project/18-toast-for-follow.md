# Toast For Follow

We want to show a toast when the user follows someone. We will use the `sonner` library for this. It is a simple and easy to use library for showing toasts.

Install the library with the following command:

```bash
npm install sonner
```

Then we need to create a toast provider. Open the `src/App.tsx` file and add the import for sonner and the Toaster optput component:

```tsx
import UserSearch from './components/UserSearch';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <div className='container'>
      <h1>GitHub User Search</h1>
      <UserSearch />
      <Toaster />
    </div>
  );
};

export default App;
```

Now go into the `src/components/UserCard.tsx` file and add the import for the toast function:

```tsx
import { toast } from 'sonner';
```

Then add the toast function to the follow mutation:

```tsx
const followMutation = useMutation({
  mutationFn: () => followGitHubUser(user.login), // 👈 FIXED
  onSuccess: () => {
    toast.success(`You have followed ${user.login}`);
    refetch();
  },
  onError: (err: any) => {
    toast.error(err.message);
  },
});
```

Add it to the unfollow mutation as well:

```ts
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowGithubUser(user.login),
    onSuccess: () => {
      toast.success(`You are no longer following ${user.login}`);
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
```

Now you should see the toast when you follow or unfollow someone.


