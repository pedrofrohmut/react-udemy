import { useEffect, useState } from "react"
import constants from "../constants"
import { setupDelay } from "../utils"

const useFetchPrices = (coinId) => {
    const [prices, setPrices] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchFromCache = () => {
        console.log("Fetched coin prices chart data from cache (Local Storage)")
        const lsPrices = localStorage.getItem("prices")
        if (lsPrices) {
            setPrices(JSON.parse(lsPrices))
            setTimeout(() => {
                setIsLoading(false)
            }, constants.minLoadingTime)
        }
    }

    const fetchFromAPI = async () => {
        // Ref Docs: https://docs.coingecko.com/v3.0.1/reference/coins-id-market-chart
        const url = `${import.meta.env.VITE_COIN_API_URL}/${coinId}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`

        const start = Date.now()
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("")
            }
            const data = await response.json()
            console.log("Fetched coin prices chart data from API")

            const dataPrices = data.prices.map((price) => ({
                x: price[0], // Timestamp
                y: price[1] // Price value
            }))

            // Format from: https://www.chartjs.org/docs/latest/getting-started/
            const chartData = {
                datasets: [
                    {
                        label: "Price (USD)",
                        data: dataPrices,
                        fill: true,
                        borderColor: "#007bff",
                        backgroundColor: "rgba(0, 123, 255, 0.1)",
                        pointRadius: 0,
                        tension: 0.3
                    }
                ]
            }

            setPrices(chartData)
            localStorage.setItem("prices", JSON.stringify(chartData))
            localStorage.setItem("pricesLastFetched", Date.now())
        } catch (err) {
            setPrices(null)
            console.log(err)
        } finally {
            setupDelay(start, constants.minLoadingTime, setIsLoading)
        }
    }

    useEffect(() => {
        const doFetching = () => {
            setIsLoading(true)

            let isValidCache = true

            const lastFetched = localStorage.getItem("pricesLastFetched")
            if (!lastFetched || Date.now() - lastFetched > constants.fetchInterval) isValidCache = false

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
        prices,
        isLoading
    }
}

export default useFetchPrices
