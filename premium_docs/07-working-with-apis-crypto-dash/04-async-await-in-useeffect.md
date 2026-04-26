# Using Async/Await in useEffect

We are fetching data from the CoinGecko API in our `useEffect` hook. We are using the `fetch` function to make the request. The `fetch` function returns a promise, so we can use `async/await` to make the code more readable. It's up to you on which method you prefer to use.


There is a small gotcha when learning the `async/await` syntax. You can't use `await` directly in the `useEffect` hook. You need to create a separate function and call it inside the `useEffect` hook.

For instance, you can NOT do this:

```jsx
useEffect(async () => {
  const response = await fetch(API_URL);
  //...
}, []);
```

Instead, you need to create a separate function and call it inside the `useEffect` hook:

```jsx
useEffect(() => {
  const fetchCoins = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCoins();
}, []);
```

In the code above, we created a function called `fetchCoins` that is `async`. We then called the function inside the `useEffect` hook. We used `try/catch` to handle any errors that might occur. We also used the `finally` block to set the `loading` state to `false`. This way, we don't have to call `setLoading(false)` in both the `try` and `catch` blocks.
