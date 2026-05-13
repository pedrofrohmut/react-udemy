import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => {
      const isPresent = prev.find((x) => x.id == product.id) !== undefined

      if (!isPresent) {
        product.quantity = 1
        return prev.concat(product)
      }

      const updatedProducts = prev.map((x) => {
        if (x.id === product.id) {
          x.quantity += 1
        }
        return x
      })

      return updatedProducts
    })
  }

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext)
