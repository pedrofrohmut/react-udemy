import { useEffect, useState } from "react"
import LimitSelector from "../components/LimitSelector"
import FilterInput from "../components/FilterInput"
import SortSelector from "../components/SortSelector"
import CoinCard from "../components/CoinCard"
import Loading from "../components/Loading"

const FIVE_MIN_MS = 5 * 60 * 1000
const LOADING_TIME = 1500

const getLastFetched = () => {
  const lastFetched = localStorage.getItem("lastFetched")
  if (!lastFetched || isNaN(lastFetched)) return null
  return parseInt(lastFetched)
}

const updateLSLastFetched = () => {
  localStorage.setItem("lastFetched", Date.now())
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
const HomePage = () => {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(initLimit)
  const [filter, setFilter] = useState("")
  const [sortBy, setSortBy] = useState("market_cap_desc")

  const isValidCache = (fetchInterval, limit) => {
    const lsCoins = getLSCoins()
    if (!lsCoins || lsCoins.length === 0) return false

    const lastFetched = getLastFetched()
    if (!lastFetched || Date.now() - lastFetched > fetchInterval) return false

    const lsLimit = getLSLimit()
    if (!lsLimit) {
      setLSLimit(limit)
    }
    if (limit !== lsLimit) return false

    console.log("Cache is valid")
    return true
  }

  const fetchFromCache = () => {
    setCoins(getLSCoins())
    console.log("From local storage")
    setTimeout(() => {
      setIsLoading(false)
    }, LOADING_TIME)
  }

  const fetchAPI = async () => {
    /*
      Ref Docs: https://docs.coingecko.com/v3.0.1/reference/coins-markets
     */
    const url = `${import.meta.env.VITE_COINS_API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`
    const start = new Date()

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()

      console.log("Fetched from API")
      setCoins(data)
      setLSCoins(data)
      setLSLimit(limit)
      updateLSLastFetched(start)
    } catch (err) {
      setError(err)
      setCoins(null)
      setLSCoins(null)
      setLSLimit(10)
    } finally {
      // Makes the delay equal to LOADING_TIME if the api takes less than the LOADING_TIME
      // or 0 delay if api fetching took longer
      const end = new Date()
      const delay = LOADING_TIME - (end - start)
      const validDelay = delay > 0 ? delay : 0
      console.log("Valid Delay: ", validDelay / 1000, " seconds")
      setTimeout(() => {
        setIsLoading(false)
      }, validDelay)
    }
  }

  useEffect(() => {
    setIsLoading(true)

    const fetchInterval = FIVE_MIN_MS
    if (isValidCache(fetchInterval, limit)) {
      fetchFromCache()
    } else {
      fetchAPI()
    }
  }, [limit])

  const handleSetLimit = (e) => {
    setLimit(e.target.value)
    setLSLimit(e.target.value)
  }

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

      <div className="top-controls">
        <FilterInput filter={filter} setFilter={setFilter} />
        <LimitSelector limit={limit} handleSetLimit={handleSetLimit} />
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {isLoading && <Loading color="white" text="Loading Coins..." />}

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

export default HomePage
