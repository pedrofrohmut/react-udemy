import Layout from "./components/Layout"
import ProductList from "./components/ProductList"
// import { useCartContext } from "./context/cart-context"

const App = () => {
  // const { cart, isLoading, error } = useCartContext()
  return (
      <Layout>
        <ProductList />
      </Layout>
  )
}

export default App
