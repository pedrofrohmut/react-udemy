import ProductList from "./components/ProductList"
import { ProductsProvider } from "./context/products-context"

const App = () => {
  return (
    <ProductsProvider>
      <div className="min-h-screen bg-gray-900 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-200">Product Catalog</h1>
        <ProductList />
      </div>
    </ProductsProvider>
  )
}

export default App
