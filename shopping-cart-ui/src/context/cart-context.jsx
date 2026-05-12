import { createContext, useContext } from "react"
import useFetchCart from "../hooks/use-fetch-cart"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { cart, isLoading, error } = useFetchCart()

  return <CartContext.Provider value={{ cart, isLoading, error }}>{children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext)
