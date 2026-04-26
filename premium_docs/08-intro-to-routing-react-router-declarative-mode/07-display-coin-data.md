# Display Coin Data

We need to display the data that we fetched in the last lesson.

Open the `pages/coin-details.jsx` page.

## Page Output

Now we can display the data on the page. Add the following code to the return statement:

```javascript
return (
  <div className='coin-details-container'>
    <Link to='/'>← Back to Home</Link>

    <h1 className='coin-details-title'>
      {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}
    </h1>

    {loading && <p>Loading...</p>}
    {error && <p className='error'>❌ {error}</p>}

    {!loading && !error && coin && (
      <>
        <img
          src={coin.image.large}
          alt={coin.name}
          className='coin-details-image'
        />
        <p>{coin.description.en.split('. ')[0] + '.'}</p>

        <div className='coin-details-info'>
          <h3>Rank: #{coin.market_cap_rank}</h3>
          <h3>Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</h3>
          <h4>Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
          <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
          <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
          <h4>
            24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)} (
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
          </h4>
          <h4>
            Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}
          </h4>
          <h4>
            Total Supply: {coin.market_data.total_supply?.toLocaleString() || 'N/A'}
          </h4>
          <h4>Max Supply: {coin.market_data.max_supply?.toLocaleString() || 'N/A'}</h4>
          <h4>
            All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{' '}
            {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
          </h4>
          <h4>
            All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{' '}
            {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
          </h4>
          <h4>Last Updated: {new Date(coin.last_updated).toLocaleString()}</h4>
        </div>

        <div className='coin-details-links'>
          {coin.links.homepage[0] && (
            <p>
              🌐{' '}
              <a
                href={coin.links.homepage[0]}
                target='_blank'
                rel='noopener noreferrer'
              >
                Website
              </a>
            </p>
          )}
          {coin.links.blockchain_site[0] && (
            <p>
              🧩{' '}
              <a
                href={coin.links.blockchain_site[0]}
                target='_blank'
                rel='noopener noreferrer'
              >
                Blockchain Explorer
              </a>
            </p>
          )}
          {coin.categories.length > 0 && (
            <p>Categories: {coin.categories.join(', ')}</p>
          )}
        </div>
      </>
    )}

    {!loading && !error && !coin && <p>No data found.</p>}
  </div>
);

```

Since we use `coin.market_data` so much, I put into it's own variable. Add this above the return statement:

```js
  const marketData = coin.market_data;
 ```

We are showing all kinds of stuff such as the stats, description, and links to the website and blockchain explorer. You can add more data if you want. The data is all there in the API response. The blockchain explorer is not always available, so we check if it exists before displaying it. The same goes for the categories. The `dangerouslySetInnerHTML` is used to display the HTML content of the description. This is a common practice when dealing with HTML content in React. Just be careful with this and make sure it is not user generated content to avoid XSS attacks. The `split` method is used to get the first sentence of the description. You can change this to get more sentences if you want.
