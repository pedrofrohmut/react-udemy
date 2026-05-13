import Layout from "./components/Layout"
import ProductList from "./components/ProductList"

const App = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6 text-gray-200 flex items-center gap-3">Product Catalog</h1>
      <ProductList />
    </Layout>
  )
}

export default App
