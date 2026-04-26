# React Query Devtools

In this lesson we will add the React Query Devtools to our project. The React Query Devtools is a great tool that allows you to inspect the queries and mutations in your application. It also allows you to see the cache and the status of the queries.

Let's install the devtools by running the following command:

```bash
npm install @tanstack/react-query-devtools
```

Then we need to import the `ReactQueryDevtools` component in the `main.tsx` file:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
```

Then we can add the `ReactQueryDevtools` component to the `QueryClientProvider` in the `main.tsx` file:

```tsx
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} position='bottom' />
      </StrictMode>
    </QueryClientProvider>
  );
}
```

Now open your browser and go to the application. You should see the React Query Devtools in the bottom right corner of the screen. You can click on it to open it and inspect the queries and mutations in your application.
