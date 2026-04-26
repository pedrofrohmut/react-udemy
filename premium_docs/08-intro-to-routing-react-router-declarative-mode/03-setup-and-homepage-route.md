# Setup and Home Page Route

Let's go ahead and install react router. Open your terminal and run the following command:

```bash
npm install react-router
```

It's no longer "react-router-dom" as it was before. Now, it's just "react-router".

## Render BrowserRouter

We need to wrap our entire application in the `BrowserRouter` component. This is the top-level component that will keep our UI in sync with the URL. Where you do this is up to you. I'm going to put it in my `main.jsx` file. You can also put it in the `App.jsx` file. I prefer to keep it in the `main.jsx` file and then define my routes in either the `App.jsx` file or in a separate file. This is a personal preference and you can do it however you like.

Let's import it at the top of the `main.jsx` file:

```jsx
import { BrowserRouter } from 'react-router';
```

Now wrap the entire application with the `BrowserRouter` component:

```jsx
// ...
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

Now we can use the router within our app.

## Configuring Routes

You can configure your routes in different places. You can keep it in the `Main.jsx` file but I want to put it in the `App.jsx` file. One reason is because we may need to pass props to the routes from our state and our state will be in this file.

Right now we are embedding the components such as the `FilterInput` and `LimitSelector` directly in the `App` component. We need to make a new page for the home page, embed the components there and then create a route for it.

Create a new folder in the `src` directory called `pages`. Inside the `pages` directory, create a new file called `Home.jsx`.

From here we basically want to have all the output that is in the `App` component in the `HomePage` component. We still want the main state in the `App` component so we can pass it down to the `HomePage` component/route.

Add the following code to the `home.jsx` file:

```jsx
import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  // Filter and sort inside the component, based on props
  const filteredCoins = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>

      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {loading && <p>Loading...</p>}
      {error && (
        <div className='error'>
          <p>❌ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className='grid'>
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No coins match your filter.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
```

I prefer to make my page components lowercase in file name and always add the word "page" to the end of the function name. This is a personal preference and you can do it however you like.

We are passing in a lot of the state from the `App` component to the `HomePage` component. We moved the filtering and sorting logic to the `HomePage` component. This is because we want to keep the `App` component clean and only have the routing logic there.

In the `App.jsx` file, import the `Routes` and `Route` components as well ad the `HomePage` component. You can also delete most of the other imports since we are not using them in the `App` component anymore. You just want this:

```jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/home';
```

Your `App.jsx` file should look like this now:

```jsx
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/home';

const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Routes>
      <Route
        path='/'
        element={
          <HomePage
            coins={coins}
            filter={filter}
            setFilter={setFilter}
            limit={limit}
            setLimit={setLimit}
            sortBy={sortBy}
            setSortBy={setSortBy}
            loading={loading}
            error={error}
          />
        }
      />
    </Routes>
  );
};

export default App;
```

We are saying that when a user navigates to the `/` path, render the `HomePage` component and we are passing in all the props that we need.

In the next lesson, we will create an about page and a route for it and I will show you how to create a link to it properly.
