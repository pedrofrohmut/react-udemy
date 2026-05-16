import { useEffect, useState } from "react"
import constants from "../constants"
import { delayIt } from "../utils"

const useFetchCoin = (coinId) => {
  const [coin, setCoin] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const isValidCache = () => {
    const lastFetched = localStorage.getItem("coinLastFetched")
    if (!lastFetched || new Date() - lastFetched > constants.fetchInterval) return false

    const lsCoinId = localStorage.getItem("coinId")
    if (!lsCoinId || lsCoinId !== coinId) return false

    return true
  }

  const fetchFromCache = async () => {
    console.log("Fetched coin details from cache (Local Storage)")
    const lsCoin = localStorage.getItem("coin")
    if (lsCoin) {
      setCoin(JSON.parse(lsCoin))
    }
  }

  const fetchFromAPI = async () => {
    try {
      // Ref Docs: https://docs.coingecko.com/v3.0.1/reference/coins-id
      const url = `${import.meta.env.VITE_COIN_API_URL}/${coinId}?x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()
      console.log("Fetched coin details from API")
      setCoin(data)
      localStorage.setItem("coin", JSON.stringify(data))
      localStorage.setItem("coinId", coinId)
      localStorage.setItem("coinLastFetched", Date.now())
    } catch (err) {
      setError(err)
    }
  }

  const doFetching = async () => {
    setIsLoading(true)
    const start = Date.now()

    if (isValidCache()) {
      fetchFromCache()
    } else {
      await fetchFromAPI()
    }

    delayIt(start, setIsLoading)
  }

  useEffect(() => {
    doFetching()
  }, [coinId])

  return { coin, isLoading, error }
}

export default useFetchCoin
