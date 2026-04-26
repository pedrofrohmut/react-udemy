# Dynamic Routes - Coin Details Page

In this section, we will create a dynamic route for the coin details page. This page will display detailed information about a specific cryptocurrency when the user clicks on it from the homepage.

## Create The Page & Route

Create a new file at `src/pages/coin-details.jsx` and add the following code for now:

```javascript
const CoinDetailsPage = () => {
  return <>details</>;
};

export default CoinDetailsPage;
```

Now create the route in the `App.jsx` file. Open `src/App.jsx` and add the following import:

```javascript
import CoinDetails from './pages/coin-details';
```

Then add the route to the `Routes` component:

```javascript
<Route path='/coin/:id' element={<CoinDetails />} />
```

This route will match any URL that starts with `/coin/` followed by an `id`.
If you go to `/coin/bitcoin`, the `CoinDetailsPage` component will be rendered.

## Getting The ID

When using declarative mode, we access the `id` from the URL using the `useParams` hook. This hook returns an object of key/value pairs of the dynamic segments of the URL.

Add the following code to the `coin-details.jsx` file:

```javascript
import { useParams } from 'react-router';

const CoinDetailsPage = () => {
  const { id } = useParams();

  return <>{id}</>;
};

export default CoinDetailsPage;
```

Go to the `/coin/bitcoin` URL and you should see `bitcoin` displayed on the page. This means that we are successfully getting the `id` from the URL.

## Add A Link

Let's add a link to the card components on the homepage. Open the `src/components/CoinCard.jsx` file and add a `Link` around everything in the return statement:

```javascript
import { Link } from 'react-router';

const CoinCard = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
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
    </Link>
  );
};

export default CoinCard;
```

## Fetching Data

Now that we have the `id`, we can use it to fetch data from the API. We will use the `useEffect` hook to fetch the data when the component mounts.

Import the `useEffect` and `useState` hooks at the top of the `coin-details.jsx` file:

```javascript
import { useEffect, useState } from 'react';
```

Add the following state values:

```javascript
const { id } = useParams();
const [coin, setCoin] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

Add the `useEffect` hook to fetch the data:

```javascript
useEffect(() => {
  const fetchCoin = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      if (!res.ok) throw new Error('Failed to fetch coin data');
      const data = await res.json();
      setCoin(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCoin();
}, [id]);
```

In the next lesson, we will show the data on the page.