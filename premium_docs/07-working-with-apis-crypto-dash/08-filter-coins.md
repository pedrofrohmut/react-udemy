# Filter Coins

At the moment, we are displaying a list of coins. We can change the limit but I want the user to be able to filter to find a certain coin.

Open the `App.jsx` file and add this new state value:

```javascript
const [filter, setFilter] = useState('');
```

This will be used to filter the coins.

## Filter Component

Create a new file at `src/components/FilterInput.jsx` and add the following code:

```javascript
const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className='filter'>
      <input
        type='text'
        placeholder='Filter by name or symbol...'
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
```

It takes in the `filter` value and a function to call when the input changes.

## Update App.jsx

Now in the `App.jsx` file, import the new component:

```javascript
import FilterInput from './components/FilterInput';
```

Add the following function above the return statement:

```javascript
const filteredCoins = coins.filter(
  (coin) =>
    coin.name.toLowerCase().includes(filter.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(filter.toLowerCase())
);
```

This will filter the coins based on the name or symbol.

We will now embed the component. I want the input and the limit selector to be side by side, so let's add a wrapper element to the two components.

```javascript
<div className='top-controls'>
  <FilterInput filter={filter} onFilterChange={setFilter} />
  <LimitSelector limit={limit} onLimitChange={setLimit} />
</div>
```

Now we need to make sure that if there is a filter input, we map over those instead of all coins:

```javascript
{
  !loading && !error && (
    <div className='grid'>
      {filteredCoins.length > 0 ? (
        filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
      ) : (
        <p>No coins match your filter.</p>
      )}
    </div>
  );
}
```

Now you should be able to filter the coins by name or symbol. If you type in the input, it will filter the list of coins to only show those that match the input.
