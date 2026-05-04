import { useEffect, useState } from "react"
import { useParams } from "react-router"

const CoinDetailsPage = () => {
  const { id } = useParams()

  const [coin, setCoin] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCoin = async () => {
    setIsLoading(true)

    const url = `${import.meta.env.VITE_COIN_API_URL}/${id}`

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()

      console.log("Fetched from API")
      setCoin(data)
    } catch (err) {
      setCoin(null)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCoin()
  }, [id])

  return <pre>{JSON.stringify(coin, null, 2)}</pre>
}

export default CoinDetailsPage
