# Adding Charts

I figured we could make this project a bit more interesting by adding some charts to the dashboard. We can use the `react-chartjs-2` library for this purpose.

Let's install the library and its dependencies:

```bash
npm install chart.js react-chartjs-2 chartjs-adapter-date-fns date-fns
```

`chart.js` is the main library. It is a popular library for creating charts, and `react-chartjs-2` is a wrapper around it that makes it easy to use with React.

`chartjs-adapter-date-fns` is an adapter for `chart.js` that allows us to use date-fns for date formatting. `date-fns` is a library for manipulating dates in JavaScript.

Now, let's create a new component at `src/components/CoinChart.js` that will render a chart.

With the CoinGecko API, we can get history data for a coin. Here is an example of an endpoint to get the history data for Bitcoin:

```
https://api.coingecko.com/api/v3/coins/{id}/market_chart?vs_currency=usd&days=7
```

This gives an array of the timestamp and price of the coin. This will be used for the dataset.

Add the following to the `CoinChart.js` file:

```javascript
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const CoinChart = ({ coinId }) => {
  return <>Chart</>;
};

export default CoinChart;
```

We are importing the necessary components from `chart.js` and `react-chartjs-2`. We are also registering the components we will use.

- CategoryScale, LinearScale: axis types
- PointElement, LineElement: the chart's visual parts
- TimeScale: allows time-based x-axis
- Tooltip, Legend: interactivity and labeling

Let's add the state:

```javascript
const [chartData, setChartData] = useState(null);
const [loading, setLoading] = useState(true);
```

Below that we will make the request to the API:

```javascript
useEffect(() => {
  const fetchChartData = async () => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
    );
    const data = await res.json();

    const prices = data.prices.map((price) => ({
      x: price[0],
      y: price[1],
    }));

    setChartData({
      datasets: [
        {
          label: 'Price (USD)',
          data: prices,
           fill: true, // Area under the line is filled
  borderColor: '#007bff', // Line color
  backgroundColor: 'rgba(0, 123, 255, 0.1)', // Fill color
  pointRadius: 0, // Hides points
  tension: 0.3, // Smooths out the line
        },
      ],
    });
    setLoading(false);
  };

  fetchChartData();
}, [coinId]);
```

We are fetching the data from the API and transforming it into a format that `chart.js` can understand. The `prices` array contains objects with `x` and `y` properties, which represent the time and price, respectively.

If you look at this page - https://react-chartjs-2.js.org/docs/working-with-datasets, you will see that we need to pass in the data in a specific format. The `datasets` array contains objects that represent the data for each dataset. In this case, we only have one dataset, which is the price of the coin. We are setting the `label`, `data`, `fill`, `borderColor`, `backgroundColor`, `pointRadius`, and `tension` properties. The `label` is the name of the dataset, the `data` is the data we fetched from the API, and the rest are styling options.
