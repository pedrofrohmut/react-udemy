import { useEffect, useState } from "react"
import { setupDelay } from "../utils"
import constants from "../constants"

const useFetchCoin = (coinId) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchFromCache = async () => {
        console.log("Fetched coin details from cache (Local Storage)")
        const lsData = localStorage.getItem("coin")
        if (lsData) {
            setData(JSON.parse(lsData))
            setTimeout(() => {
                setIsLoading(false)
            }, constants.minLoadingTime)
        }
    }

    const fetchFromAPI = async () => {
        const start = new Date()

        try {
            // Ref Docs: https://docs.coingecko.com/v3.0.1/reference/coins-id
            const url = `${import.meta.env.VITE_COIN_API_URL}/${coinId}?x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Failed to fetch data")
            }
            const data = await response.json()

            console.log("Fetched coin details from API")
            setData(data)
            setError(null)
            localStorage.setItem("coinId", coinId)
            localStorage.setItem("coin", JSON.stringify(data))
            localStorage.setItem("coinLastFetched", Date.now())
        } catch (err) {
            setData(null)
            setError(err)
        } finally {
            setupDelay(start, constants.minLoadingTime, setIsLoading)
        }
    }

    useEffect(() => {
        const doFetching = () => {
            setIsLoading(true)

            let isValidCache = true

            const lastFetched = localStorage.getItem("coinLastFetched")
            if (!lastFetched || new Date() - lastFetched > constants.fetchInterval) isValidCache = false

            const lsCoinId = localStorage.getItem("coinId")
            if (!lsCoinId || lsCoinId !== coinId) isValidCache = false

            if (isValidCache) {
                fetchFromCache()
            } else {
                fetchFromAPI()
            }
        }

        doFetching()
    }, [coinId])

    return {
        coin: data,
        isLoading,
        error
    }
}

export default useFetchCoin
