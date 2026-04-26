# Section Quiz

1. This is the correct way to make an HTTP request in a `useEffect`:

```js
useEffect(async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  setCoins(data);
}, []);
```

- [ ] True
- [ ] False

Answer: B - False: You can not make the `useEffect` callback asynchronous

2. What must environment variables in Vite be prefixed with?

- [ ] REACT_APP_
- [ ] VITE_APP_
- [ ] VITE_
- [ ] ENV_

Answer: C - VITE_

3.  What is the purpose of adding limit to the dependency array of the useEffect hook?

```js
useEffect(() => {
  const fetchCoins = async () => {
    try {
      const res = await fetch(
        `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
      );
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
}, [limit]);
```

- [ ] To prevent the component from re-rendering when the limit changes
- [ ] To refresh the API data every second
- [ ] To refetch the data whenever the selected limit changes
- [ ] To ensure the dropdown stays disabled

Answer: C -  To refetch the data whenever the selected limit changes

4. Why might the useEffect code appear to run twice in development mode?

- [ ] The component is being re-rendered due to state changes
- [ ] React DevTools forces a re-render to test state updates
- [ ] React’s Strict Mode intentionally mounts and unmounts the component to catch bugs
- [ ] The API responds twice due to caching

Answer: C - React’s Strict Mode intentionally mounts and unmounts the component to catch bugs

5.  Why did we use .slice() before calling .sort() on the coins array?

- [ ] To format the array for rendering in React
- [ ] To avoid mutating the original coins state array
- [ ] So App.jsx can be used as a class component
- [ ] To make the sort run faster in memory

Answer: B - To avoid mutating the original coins state array

6. What is a shallow copy of an array in JavaScript?

- [ ] A copy that includes only the first half of the array
- [ ] A deeply cloned version of the array and all its nested objects
- [ ] A new array that contains references to the same items as the original
- [ ] A sorted version of the array stored in memory

Answer: C - A new array that contains references to the same items as the original
