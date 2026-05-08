import { useEffect, useState } from "react"
import ProductList from "./components/ProductList"

const useFetchProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/products")
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

const App = () => {
  const { products, isLoading, error } = useFetchProducts()

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Product Catalog</h1>
      {isLoading && <p>Loading...</p>}

      {!isLoading && error && <div className="error">❌ {error}</div>}

      {!isLoading && !error && (
        <ProductList products={products} />
      )}
    </div>
  )
}

export default App
