# Show Chart Data

Let's now add the chart to the `CoinChart.jsx` component.

Add the loading check above the main return:

```javascript
if (loading) return <p>Loading chart...</p>;
```

Now add the return statement:

```javascript
return (
  <div style={{ marginTop: '30px' }}>
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
            legend: { display: false }, // Hide the legend
            tooltip: { mode: 'index', intersect: false }, // Tooltip appears when hovering near a point
        },
        scales: {
        x: {
  type: 'time', // Uses date-based axis
  time: {
    unit: 'day', // Each tick on the axis represents a day
  },
  ticks: {
    autoSkip: true, // Skip ticks if there are too many
    maxTicksLimit: 7, // Show at most 7 ticks
},
}
        y: {
  ticks: {
    callback: (value) => `$${value.toLocaleString()}`, // Format numbers like $25,000
  },
}
        },
      }}
    />
  </div>
);
```

We are using the `Line` component from `react-chartjs-2` to render the chart. We are passing in the `chartData` and some options to customize the chart. The `responsive` option makes the chart responsive, and the `plugins` option allows us to customize the legend and tooltip. The `scales` option allows us to customize the x and y axes. The x-axis is set to be a time scale, and we are formatting the ticks to show the price in USD.

Now we can use the `CoinChart` component in the `CoinDetails` component. Open `src/pages/CoinDetails.js` and import the `CoinChart` component:

```javascript
import CoinChart from '../components/CoinChart';
```

Then, add the `CoinChart` component below the `CoinDetails` component:

```javascript
 <CoinChart coinId={coin.id} />
```

Now you should see the chart on the details pages.
