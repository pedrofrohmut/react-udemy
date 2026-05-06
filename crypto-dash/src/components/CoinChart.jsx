import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js"
import "chartjs-adapter-date-fns"
import { useEffect, useState } from "react"
import { formatMoney } from "../utils"
import Loading from "./Loading"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale)

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: "index",
      intersect: false
    }
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day"
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 7
      }
    },
    y: {
      ticks: {
        callback: (value) => `$ ${formatMoney(value)}`
      }
    }
  }
}

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  /*
    TODO: Save to LS and only update when changing the coinId (for now)
   */
  const fetchPrices = async () => {
    /*
      Ref Docs: https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart
     */
    const url = `${import.meta.env.VITE_COIN_API_URL}/${coinId}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("")
      }
      const data = await response.json()

      const prices = data.prices.map((price) => ({
        x: price[0], // Timestamp
        y: price[1] // Price value
      }))

      // Format from: https://www.chartjs.org/docs/latest/getting-started/
      setChartData({
        datasets: [
          {
            label: "Price (USD)",
            data: prices,
            fill: true,
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.1)",
            pointRadius: 0,
            tension: 0.3
          }
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()
  }, [])

  if (isLoading) return <Loading color="black" text="Loading Chart Prices..." />

  return (
    <div style={{ marginTop: "30px" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export default CoinChart
