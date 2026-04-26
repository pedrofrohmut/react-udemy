# Display Coin Data

Now that we have the data from the API, we can output it in the JSX. Remember, we have to account for both the `loading` and `error` states.

We could do this a few ways. We can have separate if statements for each state, or we can use a ternary operator.

So we could do something like this:

```jsx
if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return (
    <div className='error'>
      <p>❌ {error}</p>
    </div>
  );
}

return (
  <div>
    <h1>🚀 Crypto Dash</h1>
  </div>
);
```

I prefer to do it in the same return as a short-circuit condition:

```jsx
return (
  <div>
    <h1>🚀 Crypto Dash</h1>
    {loading && <p>Loading...</p>}
      {error && (
        <div className='error'>
          <p>❌ {error}</p>
        </div>
      )}
  </div>
);
```

If you reload, you should see the loading message real quick.

## Outputting the Data

Let's now add the data that is in the `coins` state. We also want to make sure there is no error and it's not loading before we try and output the data.

Here is the final code:

```jsx
import { useEffect, useState } from 'react';
const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
       {loading && <p>Loading...</p>}
      {error && (
        <div className='error'>
          <p>❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <main className='grid'>
          {coins.map((coin) => (
            <div className='coin-card' key={coin.id}>
              <div className='coin-header'>
                <img src={coin.image} alt={coin.name} className='coin-image' />
                <div>
                  <h2>{coin.name}</h2>
                  <p className='symbol'>{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p>Price: ${coin.current_price.toLocaleString()}</p>
              <p
                className={
                  coin.price_change_percentage_24h >= 0
                    ? 'positive'
                    : 'negative'
                }
              >
                24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};

export default App;
```

You should now see a nice layout of all the coins with their respective data. We used some formatting methods like `toLocaleString()` and `toFixed()` to make the numbers more readable. We also added a conditional class to the 24h change percentage to show green if it's positive and red if it's negative.

If you see an error, make sure you have the correct API URL and that you are not exceeding the rate limit.

## Coin Card

Let's move the coin card into its own component. Create a new file at `src/components/CoinCard.js` in the `src` folder and add the following code:

```jsx
const CoinCard = ({ coin }) => {
  return (
    <div className='coin-card' key={coin.id}>
      <div className='coin-header'>
        <img src={coin.image} alt={coin.name} className='coin-image' />
        <div>
          <h2>{coin.name}</h2>
          <p className='symbol'>{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <p>Price: ${coin.current_price.toLocaleString()}</p>
      <p
        className={
          coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
        }
      >
        24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinCard;
```

Bring it into the `App.js` file and use it:

```jsx
import { useEffect, useState } from 'react';
import CoinCard from './components/CoinCard';

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {loading && <p>Loading...</p>}
      {error && (
        <div className='error'>
          <p>❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <main className='grid'>
          {coins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
```
