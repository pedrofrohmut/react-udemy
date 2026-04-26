# Sort Selector

Let's add some sorting options for the prices and market cap.

Open the `src/App.jsx` file and add a new piece of state to hold the sorting option.

```javascript
const [sortBy, setSortBy] = useState('market_cap_desc');
```

Create a new component at `src/components/SortSelector.jsx` to hold the sorting options.

```javascript
const SortSelector = ({ sortBy, onSortChange }) => {
  return (
    <div className='controls'>
      <label htmlFor='sort'>Sort by:</label>
      <select
        id='sort'
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value='market_cap_desc'>Market Cap (High to Low)</option>
        <option value='price_desc'>Price (High to Low)</option>
        <option value='price_asc'>Price (Low to High)</option>
        <option value='change_desc'>24h Change (High to Low)</option>
        <option value='change_asc'>24h Change (Low to High)</option>
      </select>
    </div>
  );
};

export default SortSelector;
```

This component will render a dropdown with the sorting options. The `onSortChange` prop will be called when the user selects a new sorting option.

Import the `SortSelector` component in `src/App.jsx`:

```javascript
import SortSelector from './components/SortSelector';
```

Now add it to the return statement just below the `FilterInput` and `LimitSelector` components:

```javascript
<div className='top-controls'>
  <FilterInput filter={filter} onFilterChange={setFilter} />
  <LimitSelector limit={limit} onLimitChange={setLimit} />
  <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
</div>
```

## Apply The Sorting Logic

It will show in the UI but we need to apply the sorting logic to the data. we can do this by updating the `filterCoins` function:

```javascript
const filteredCoins = coins
  .filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
  )
  .slice() // 🔥 Important: make a shallow copy before sorting!
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
```

We use `.slice()` to copy the array before sorting because the `sort()` method mutates the original array by default which we don't want. We want to avoid mutating state directly. This is a common pattern in React to ensure that we don't mutate state directly. `slice()` creates a shallow copy of the array, which just means that we create a new array that contains the same elements as the original array, but is a different object in memory.This is important because React relies on immutability to detect changes in state and re-render components accordingly.

We then use the .sort() method to sort the array based on the selected sorting option. We pass in a compare function with a and b as params.

These represent two items in the array that are being compared. The function returns:

    - A negative number if a should come before b
    - Zero if they’re equal (no change in order)
    - A positive number if a should come after b

This tells JavaScript how to reorder the array. For example, if we’re sorting by price in descending order, we return b.current_price - a.current_price so that higher prices come first.

This compare function is run on every pair in the array to figure out the correct order.
