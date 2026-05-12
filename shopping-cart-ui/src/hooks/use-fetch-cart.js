import { useEffect, useState } from "react"

const useFetchCart = () => {
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCart = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/cart")
      if (!response.ok) {
        throw new Error(`[${response.status}] Failed to fetch cart`)
      }
      const data = await response.json()
      setCart(data)
    } catch (err) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return { cart, isLoading, error }
}

export default useFetchCart
