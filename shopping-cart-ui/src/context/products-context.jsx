import { createContext, useContext } from "react"
import useFetchProducts from "../hooks/use-fetch-products"

const ProductsContext = createContext()

export const ProductsProvider = ({ children }) => {
  // This custom hook was created before this provider,
  // that is way this are in the custom hook and not here
  const { products, isLoading, error } = useFetchProducts()

  return <ProductsContext.Provider value={{ products, isLoading, error }}>{children}</ProductsContext.Provider>
}

export const useProductsContext = () => useContext(ProductsContext)
