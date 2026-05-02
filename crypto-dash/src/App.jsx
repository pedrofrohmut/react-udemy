import { useEffect, useState } from "react"
import CoinCard from "./components/CoinCard"
import LimitSelector from "./components/LimitSelector"

const FIVE_MIN_MS = 5 * 60 * 1000
const FETCH_INTERVAL = FIVE_MIN_MS

const getLastFetched = () => {
  const lastFetched = localStorage.getItem("lastFetched")
  if (!lastFetched || isNaN(lastFetched)) return null
  return parseInt(lastFetched)
}

const updateLastFetched = (shouldKeep) => {
  if (!shouldKeep) {
    localStorage.removeItem("lastFetched")
  } else {
    localStorage.setItem("lastFetched", Date.now())
  }
}

// LocalStorage is fresh enough get from it instead of fetching
const isTimeToFetch = (lastFetched, fetchInterval) => {
  if (!lastFetched) return true
  const timeDiff = Date.now() - lastFetched
  return timeDiff > fetchInterval
}

const getLSCoins = () => {
  const lsCoins = localStorage.getItem("coins")
  if (!lsCoins) return []
  return JSON.parse(lsCoins)
}

const setLSCoins = (coins) => {
  if (coins && coins.length > 0) {
    localStorage.setItem("coins", JSON.stringify(coins))
  } else {
    localStorage.removeItem("coins")
  }
}

const setLSLimit = (limit) => {
  localStorage.setItem("coinsLimit", limit)
}

const getLSLimit = () => {
  let limit = localStorage.getItem("coinsLimit")
  if (!limit) return null
  return parseInt(limit)
}

const limitChanged = (limit) => {
  const lsLimit = getLSLimit()

  if (!lsLimit) {
    setLSLimit(limit)
    return true
  }

  if (lsLimit !== limit) return true

  return false
}

// Using localStorage as cache to avoid too much fetching
// Update it acording to FETCH_INTERVAL
const shouldFetch = (lsCoins, limit) => {
  if (!lsCoins || lsCoins.length == 0) return true

  const lastFetched = getLastFetched()
  if (isTimeToFetch(lastFetched, FETCH_INTERVAL)) return true

  if (limitChanged(limit) || lsCoins.length !== limit) return true

  return false
}

const initLimit = () => {
  const lsLimit = getLSLimit()
  if (!lsLimit) return 10
  return lsLimit
}

/*
  TODO: Create a custom hook for fetching that have the caching with localStorage
  all the logic here to a custom hook that you can use in other places just changing
  the url and the localStorage key and setting the time for the cache invalidate

  Exp: const { data, isLoading, error } = useCachedFetch(URL, LOCAL_STORAGE_KEY, CACHE_TIME)
*/

const App = () => {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(initLimit)

  const fetchAPI = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()

      console.log("Fetched from API")
      setCoins(data)
      setIsLoading(false)
      setLSCoins(data)
      setLSLimit(limit)
      updateLastFetched(true)
    } catch (err) {
      setError(err)
      setCoins([])
      setIsLoading(false)
      setLSCoins(null)
      setLSLimit(10)
      updateLastFetched(false)
    }
  }

  const fetchCachedAPI = async () => {
    const lsCoins = getLSCoins()

    if (!shouldFetch(lsCoins, limit)) {
      console.log("From local storage")
      setCoins(lsCoins)
      setIsLoading(false)
      return
    }

    fetchAPI()
  }

  // TODO: Setup aborting with AbortController for the fetch call
  useEffect(() => {
    fetchCachedAPI()
  }, [limit])

  return (
    <div>
      <h1>Crypto Dash!</h1>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {isLoading && <p>Fetching Coins...</p>}

      <LimitSelector limit={limit} setLimit={setLimit} />

      {!isLoading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          ))}
        </main>
      )}
    </div>
  )
}

export default App
