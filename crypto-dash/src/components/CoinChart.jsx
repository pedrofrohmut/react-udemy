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
import Loading from "./Loading"
import { formatMoney } from "../utils"

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

const CoinChart = ({ prices, isLoading }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      {isLoading && <Loading color="black" text="Loading Prices Chart..." />}

      {!isLoading && !prices && <h3>No data for the chart</h3>}

      {!isLoading && prices && <Line data={prices} options={chartOptions} />}
    </div>
  )
}

export default CoinChart
