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

const updateLastFetched = shouldKeep => {
  if (!shouldKeep) {
    localStorage.removeItem("lastFetched")
  } else {
    localStorage.setItem("lastFetched", Date.now())
  }
}

const canFetch = (lastFetched, fetchInterval) => {
  if (!lastFetched) return true
  const timeDiff = Date.now() - lastFetched
  return timeDiff > fetchInterval
}

const getLSCoins = () => {
  const lsCoins = localStorage.getItem("coins")
  if (!lsCoins) return []
  return JSON.parse(lsCoins)
}

const setLSCoins = coins => {
  if (coins && coins.length > 0) {
    localStorage.setItem("coins", JSON.stringify(coins))
  } else {
    localStorage.removeItem("coins")
  }
}

const App = () => {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAPI = async () => {
    const lastFetched = getLastFetched()
    const lsCoins = getLSCoins()

    // Using localStorage as cache to avoid too much fetching
    // Update it acording to FETCH_INTERVAL
    if (lsCoins.length > 0 && !canFetch(lastFetched, FETCH_INTERVAL)) {
      console.log("From local storage")
      // LocalStorage is fresh enough get from it instead of fetching
      setCoins(lsCoins)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()

      console.log("Fetched from API")
      setCoins(data)
      setIsLoading(false)
      setLSCoins(data)
      updateLastFetched(true)
    } catch (err) {
      setError(err)
      setIsLoading(false)
      setLSCoins(null)
      updateLastFetched(false)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <div>
      <h1>Crypto Dash</h1>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {isLoading && <p>Fetching Coins...</p>}

      {!isLoading && <pre>{JSON.stringify(coins, null, 2)}</pre>}
    </div>
  )
}

export default App
