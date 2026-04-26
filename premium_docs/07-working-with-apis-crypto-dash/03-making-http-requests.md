# Making HTTP Requests

In this lesson, we will learn how to make HTTP requests in React. Usually, you will do this either from an event handler or using the `useEffect` hook if you want the data to be fetched when the component is mounted.

We're going to fetch some crypto data from the CoinGecko API. We're going to use Fetch, but you could just as well use Axios or any other library.

Let's start by opening the `App.jsx` file and importing both `useEffect` and `useState` from React and adding a piece of state for the coins, the loading state and state for any errors if there are any. The loading state will be used to show a loading spinner while the data is being fetched.

```jsx
import { useEffect, useState } from 'react';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
    </div>
  );
};

export default App;
```

You'll notice that I set the loading state to `true` by default. This is because we want to show a loading spinner while the data is being fetched. This is a common practice to start with it as true and then set it to `false` once the data is fetched. We also initialized the `coins` state to an empty array. This is where we will store the data fetched from the API. We also set the `error` state to an empty array. We will use this to store any errors that occur during the fetch.

## Making The Request

Now, let's add the `useEffect` hook to fetch the data from the CoinGecko API. This is a free API that provides a lot of data about cryptocurrencies. We will use the `/coins/markets` endpoint to fetch the data. You can find more information about the API [here](https://www.coingecko.com/en/api/documentation).

We will also add some query params to the request. We will set the `vs_currency` to `usd` and the `order` to `market_cap_desc`. This will return the top 10 cryptocurrencies by market cap in descending order.

I am also going to include `sparkline=false`. Sparkline is a coins price trend over a time period. We won't be using that data so I'm setting it to false to lighten the data load a bit.

Here is the URL:

```
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false
```

In fact, we can store it in a variable for now. Ultimately, we will move it to a `.env` file.

```jsx
import { useEffect, useState } from 'react';
const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const App = () => {
  // ...
};
```

We will use the `fetch` function to make the request. I am initially going to show you how to use the `.then()` syntax and then I will refactor to `async/await`, because there are a few gotchas.

Add the following code inside the `useEffect` hook:

```jsx
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
    </div>
  );
};

export default App;
```

We called the `fetch` function with the `API_URL` and then we chained a `.then()` method to handle the response. If the response is not ok, we throw an error. If it is ok, we parse the JSON and set the `coins` state to the data. We also set the `loading` state to `false` to hide the loading spinner. If there is an error, we set the `error` state to the error message and set the `loading` state to `false`.

We are not displaying the data yet, but if you open the console, you should see the data being logged. Also, check the React Devtools 'Components' tab in the browser to see the state being updated.

Some of the data that we get back that we will be using is:

- `name`
- `image`
- `current_price`
- `market_cap`
- `price_change_percentage_24h`

If you add something to the url to make it invalid, you should see the error message get added to the state.

# Why Is My useEffect Running Twice?


You may notice that in the console your data is being displayed twice. This is because of how Strict Mode works in development. It actually intentionally runs some parts of your code twice — especially things like useEffect — to help catch bugs early.

Here’s what’s happening:

    - When your component mounts, React runs the effect, like your fetch() call.

    - Then, React unmounts the component, as a test.

    - Then it mounts it again and runs the effect a second time.

This doesn’t happen in production — it’s only in development to make sure things like API calls, timers, and subscriptions are set up and cleaned up properly. So if you see your data printed twice or a fetch call running more than once, don’t panic — it's just React being cautious.

If you're curious, this is all controlled by <React.StrictMode> in your app's entry file. You can remove it to stop the double run during testing, but it's helpful to leave it in while developing to catch potential bugs.

In the next lesson, we will see how to use the `async/await` syntax to make the request.
