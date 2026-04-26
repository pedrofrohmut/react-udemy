# Prefetching Data with TanStack Query

In this section, we will learn how to prefetch data using TanStack Query. Prefetching is a technique that allows us to load data in advance, so it is available when we need it. This can improve the user experience by reducing loading times and making the application feel more responsive.

We are going to use a method called `prefetchQuery` to prefetch the Recent Github user when we hover over the link to the user. This will allow us to load the data in advance, so it is available when we need it.

We will also use the `useQueryClient` hook to get access to the query client, which is used to prefetch the data.

Open the `RecentSearches.tsx` file and add imports for the `useQueryClient` hook as well as the `fetchGithubUser` function at the top of the file:

```tsx
import { useQueryClient } from '@tanstack/react-query';
```

Above the return add the following:

```tsx
const queryClient = useQueryClient();
```

Now, we will add the `onMouseEnter` event to the link that goes to the user. This will allow us to prefetch the data when we hover over the link.

```tsx
<li key={user}>
  <button
    onClick={() => onSelect(user)}
    onMouseEnter={() =>
      queryClient.prefetchQuery({
        queryKey: ['users', user],
        queryFn: () => fetchGitHubUser(user),
      })
    }
  >
    <FaUser className='user-icon' />
    {user}
  </button>
</li>
```

This will call the `fetchGitHubUser` function and prefetch the data when we hover over the link.

You can make a few searches and then open your devtools to see the network tab. You will see that the data is prefetched when you hover over the link. This will allow us to load the data in advance, so it is available when we need it.

## What Is The Benefit of Prefetching Data?

Prefetching data can improve the user experience by reducing loading times and making the application feel more responsive. By prefetching data, we can load it in advance, so it is available when we need it. This can make the application feel faster and more responsive, as the data is already loaded when we need it.

Without prefetching:

- User clicks a link.
- Browser loads the route/component + fetches data.
- User sees a loading spinner.

With prefetching:

- User hovers.
- While they’re still deciding, you fetch everything silently.
- They click → it’s instant. No spinner. No delay. Just the page.
