import ProductList from "./components/ProductList"
import { useCartContext } from "./context/cart-context"

const App = () => {
  const { cart, isLoading, error } = useCartContext()
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Product Catalog</h1>
      <ProductList />
    </div>
  )
}

export default App
