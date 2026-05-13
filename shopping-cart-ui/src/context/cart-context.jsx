import { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext()

const initCart = () => {
  const lsCart = localStorage.getItem("cart")
  if (!lsCart) return []
  return JSON.parse(lsCart)
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initCart)

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

  const removeFromCart = (productId) => {
    if (confirm()) {
      setCart((prev) => prev.filter((x) => x.id !== productId))
    }
  }

  const clearCart = () => {
    if (confirm()) {
      setCart([])
    }
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext)
