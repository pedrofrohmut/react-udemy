# TanStack Query Setup

In this lesson, we will setup the TanStack Query library in our project by providing the query client to our routes. But first let's talk about why you may want to use TanStack Query as oppsosed to just fetching right from the loader.

It is not a must to use TanStack Query, but it is a great library with the following benefits:

- Automatic caching: Once an idea is loaded, it’s cached. Navigating back to it = instant, no refetch.

- **Background refetching:** If you want, you can silently update stale data behind the scenes.
- **Retries on failure:** You can retry fetches if the network is flaky
- **Offline support:** Data persists even if the user goes offline
- **Mutations with automatic cache updates:** useMutation() can update or invalidate queries
- **Stale/ Fresh control:** You control how long data is considered "fresh" with staleTime

The disadvantages are:

- **More complexity:** You have to learn a new API and how to use it. It is not as simple as just fetching data in the loader.
- **More dependencies:** You have to add another library to your project. This is not a big deal, but it is something to consider.
- **More boilerplate:** You have to write more code to set it up. This is not a big deal, but it is something to consider.

So it's completely up to you if you want to use TanStack query or not. I would say in smaller projects, it's fine to not use it but larger projects can really benefit when it comes to caching and data fetching.

## Install TanStack Query

First, we need to install TanStack Query. Run the following command:

```bash
npm install @tanstack/react-query
```

## Query Client Provider

We need to setup the provider to wrap our app. Open the `main.tsx` file and add the following import:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
```

Just to clarify what the queryClient does, it's basically the "brain" of TanStack Query. It does the following:

- Stores all the cached data
- Tracks loading/error states
- Handles background refetching
- Manages stale time, retries, etc.

Add the following code below the imports:

```tsx
// Initialize the query client
// This is used for data fetching and caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
```

`new QueryClient()` creates a new client instance that manages all your useQuery, useMutation, etc.

By default, TanStack Query retries failed queries 3 times (e.g., network flakiness). That’s useful in production, but during dev or in some APIs like Firebase/Firestore, it can hide issues (e.g., unauthorized access or 404s) and it makes error debugging annoying. So setting retry: false means:

- Fail fast
- Show errors instantly
- Easier to debug

## Router Context

We can attach the TanStack Query provider to the router context. This way, we can use TanStack Query in any component that is a child of the router.

```tsx
const router = createRouter({
  routeTree,
  context: { queryClient }, // Pass the queryClient to the router context
  //..
});
```

Now we need to wrap the `RouterProvider` with the `QueryClientProvider` and pass the `queryClient` as a prop:

```tsx
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </QueryClientProvider>
  );
}
```

## Update Root Route

Since we are using the queryClient in the root route, we need to update the `rootRoute` to include the queryClient in the context.

In the `src/routes/__root.tsx` file, import the `createRootRouteWithContext` and the `QueryClient` and replace the `createRootRoute` function with `createRootRouteWithContext` and give it the context type as a generic.

```tsx
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient } from '@tanstack/react-query';

// Declare the shape of the context
type RouterContext = {
  queryClient: QueryClient;
};

// Pass the context type as a generic
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now every route (and its loader) can access the shared queryClient