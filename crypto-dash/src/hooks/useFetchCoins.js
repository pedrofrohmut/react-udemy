import { useEffect, useState } from "react"
import constants from "../constants"

const useFetchCoins = (limit, sortBy) => {
  const [coins, setCoins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const isValidCache = () => {
    const lsCoins = JSON.parse(localStorage.getItem("coins"))
    if (!lsCoins || lsCoins.length === 0) return false

    const lastFetched = localStorage.getItem("coinsLastFetched")
    if (!lastFetched || Date.now() - lastFetched > constants.fetchInterval) return false

    const lsLimit = localStorage.getItem("coinsLimit")
    if (!lsLimit || limit !== parseInt(lsLimit)) return false

    console.log("Coins cache is valid")
    return true
  }

  const fetchFromCache = () => {
    console.log("Fetching from Cache")
    setCoins(JSON.parse(localStorage.getItem("coins")) ?? null)
  }

  const fetchFromAPI = async () => {
    // Ref Docs: https://docs.coingecko.com/v3.0.1/reference/coins-markets
    const url = `${import.meta.env.VITE_COINS_API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()
      console.log("Fetching from API")
      setCoins(data)
      localStorage.setItem("coins", JSON.stringify(data))
      localStorage.setItem("coinsLastFetched", Date.now())
      localStorage.setItem("coinsLimit", limit)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    const doFetching = async () => {
      setIsLoading(true)
      const start = Date.now()

      if (isValidCache()) {
        fetchFromCache()
      } else {
        await fetchFromAPI()
      }

      const elapsed = Date.now() - start
      const delay = elapsed < constants.minLoadingTime ? constants.minLoadingTime - elapsed : 0
      console.log("Delay:", delay)
      setTimeout(() => {
        setIsLoading(false)
      }, delay)
    }

    doFetching()
  }, [limit])

  return {
    coins,
    isLoading,
    error
  }
}

export default useFetchCoins
