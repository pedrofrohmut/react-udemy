import { useEffect, useState } from "react"

const API_URL =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
const FIVE_MIN_MS = 5 * 60 * 1000
const FETCH_INTERVAL = FIVE_MIN_MS

const getLastFetched = () => {
  const lastFetched = localStorage.getItem("lastFetched")
  if (!lastFetched || isNaN(lastFetched)) return null
  return parseInt(lastFetched)
}

const updateLastFetched = () => {
  localStorage.setItem("lastFetched", Date.now())
}

const canFetch = (lastFetched, fetchInterval) => {
  if (!lastFetched) return true
  const timeDiff = Date.now() - lastFetched
  return timeDiff > fetchInterval
}

const App = () => {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAPI = async () => {
    const lastFetched = getLastFetched()
    if (!canFetch(lastFetched, FETCH_INTERVAL)) return

    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()

      console.log(data)

      setCoins(data)
      setIsLoading(false)

      updateLastFetched()
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div>
      <h1>Crypto Dash</h1>
    </div>
  )
}

export default App
