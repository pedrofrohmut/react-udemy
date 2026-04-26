# Add a Proxy

Right now, we are typing the full URL to the API, which includes the localhost and port. This will become an issue once we deploy the app. We will need to change the URL to the production URL. To avoid this, we can use a proxy.

Open the `vite.config.ts` file and add the following block:

```ts
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
```

Now in your API calls, you can use the `/api` prefix and it will be proxied to the API.

Now you can do the following:

```ts
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
```

And any other requests you make to the API. This will make it easier to switch between development and production environments without having to change the code.
