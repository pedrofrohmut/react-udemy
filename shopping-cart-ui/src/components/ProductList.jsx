import { useProductsContext } from "../context/products-context"
import ProductCard from "./ProductCard"

const ProductList = () => {
  const { products, isLoading, error } = useProductsContext()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {isLoading && <p>Loading...</p>}

      {!isLoading && error && <div className="error">❌ {error}</div>}

      {!isLoading && !error && !products && <p>No products in the list</p>}

      {!isLoading &&
        !error &&
        products &&
        products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}

export default ProductList
