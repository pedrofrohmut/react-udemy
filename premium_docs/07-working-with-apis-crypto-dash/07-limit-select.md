# Limit Select

Right now, we are showing 10 coins, however we can get more than that. Let's add a select list to change the limit and reflect that in the UI by changing the params on the API call.

Add the following state to the `App.jsx` file:

```javascript
const [limit, setLimit] = useState(10);
```

This will hold the limit value. The `limit` state will be used to store the value of the select input.

Next, we need to add a select input to the UI. Open the `App.jsx` file and add the following code below the heading:

```javascript
<div className='controls'>
  <label htmlFor='limit'>Show:</label>
  <select
    id='limit'
    value={limit}
    onChange={(e) => setLimit(Number(e.target.value))}
  >
    <option value='5'>5</option>
    <option value='10'>10</option>
    <option value='20'>20</option>
    <option value='50'>50</option>
    <option value='100'>100</option>
  </select>
</div>
```

This will create a select input with the options to show 5, 10, 20, 50, and 100 coins. The `onChange` event will update the `limit` state with the selected value.

Now, we need to update the API call to use the `limit` state. Open the `App.jsx` file and update the API call to include the `limit` parameter. you also want this to run whenever the `limit` state changes. So, update the `useEffect` hook to include the `limit` state as a dependency:

```javascript
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

## Move To It's Own Component

Let's move the limit selector to it's own component. 

Create a new file in `src/components` called `LimitSelector.jsx`. In this file, we will create a functional component that will render the select input.

```javascript
const LimitSelector = ({ limit, onLimitChange }) => {
  return (
    <div className='controls'>
      <label htmlFor='limit'>Show:</label>
      <select
        id='limit'
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='50'>50</option>
        <option value='100'>100</option>
      </select>
    </div>
  );
};

export default LimitSelector;
```

Now, bring it into the `App.jsx` file and use it. You will need to import it at the top of the file:

```javascript
import LimitSelector from './components/LimitSelector';
```

Replace the `<div className='controls'>` with the `LimitSelector` component:

```javascript
<LimitSelector limit={limit} onLimitChange={setLimit} />
```

That's it! You have successfully moved the limit selector into its own component. Now, you can reuse this component in other parts of your app if needed.