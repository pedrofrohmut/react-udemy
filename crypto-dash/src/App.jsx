import { useEffect, useState } from "react"
import LimitSelector from "./components/LimitSelector"
import FilterInput from "./components/FilterInput"
import SortSelector from "./components/SortSelector"
import CoinCard from "./components/CoinCard"

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


  TODO: Create a interval that updates the pages every 5 min (FETCH_INTERVAL) if it is focus
  or checks the last fetched when the page gains focus. Keep page content fresh if it is focused
*/

/*
  Component description:
  TODO: Add the description here explaining everything that this component does.
  */
const App = () => {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(initLimit)
  const [filter, setFilter] = useState("")
  const [sortBy, setSortBy] = useState("market_cap_desc")

  const fetchAPI = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`
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
  }, [limit, sortBy])

  const filteredAndSorted = coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap
        case "market_cap_asc":
          return a.market_cap - b.market_cap

        case "price_desc":
          return b.current_price - a.current_price
        case "price_asc":
          return a.current_price - b.current_price

        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h
      }
    })

  return (
    <div>
      <h1>Crypto Dash!</h1>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {isLoading && <p>Fetching Coins...</p>}

      <div className="top-controls">
        <FilterInput filter={filter} setFilter={setFilter} />
        <LimitSelector limit={limit} setLimit={setLimit} />
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {!isLoading && !error && (
        <main className="grid">
          {filteredAndSorted.length === 0 && <p>No matching coins</p>}

          {filteredAndSorted.length > 0 && (
            <>
              {filteredAndSorted.map((coin) => (
                <CoinCard coin={coin} key={coin.id} />
              ))}
            </>
          )}
        </main>
      )}
    </div>
  )
}

export default App
