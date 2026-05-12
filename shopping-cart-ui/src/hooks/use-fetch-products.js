import { useEffect, useState } from "react"

const useFetchProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/products")
      if (!response.ok) {
        throw new Error(`[${response.status}] Failed to fetch products`)
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, isLoading, error }
}

export default useFetchProducts
