import { FaShoppingCart, FaRegTrashAlt } from "react-icons/fa"
import { useCartContext } from "../context/cart-context"
import { useState } from "react"

const Layout = ({ children }) => {
  const { cart, removeFromCart, clearCart } = useCartContext()
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)

  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const handleToggleDropdown = () => setIsOpenDropdown((prev) => !prev)

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      <header className="bg-black shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">ShopMate</h1>

        <div className="relative">
          <button onClick={handleToggleDropdown} className="cursor-pointer">
            <FaShoppingCart className="text-2xl text-gray-400" />
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded rounded-full">
                {itemsCount}
              </span>
            )}
          </button>

          {isOpenDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 border rounded shadow-lg z-50 p-4">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Cart Items</h2>
                <button
                  onClick={() => setIsOpenDropdown(false)}
                  className="font-semibold px-1 text-red-600 cursor-pointer"
                >
                  X
                </button>
              </div>
              {cart.length === 0 && <p className="text-gray-500 text-sm">Your cart is empty</p>}

              {cart.length > 0 && (
                <>
                  <ul className="max-h-60 overflow-y-auto devide-y devide-gray-200">
                    {cart.map((item) => (
                      <li key={item.id} className="flex justify-between items-center py-2">
                        <div>
                          <p className="semi-bold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            <span>{item.quantity}</span> x <span>${item.price}</span>
                          </p>
                        </div>
                        <button
                          className="text-red-700 cursor-pointer p-1 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between semi-bold">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                  <button
                    className="cursor-pointer text-sm w-full bg-red-700 text-white font-semibold py-2 rounded mt-3 hover:underline hover:text-red-500"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">{children}</main>

      <footer className="text-center pt-1 pb-2 text-sm text-gray-500">Shopping Cart UI 2026 &copy;</footer>
    </div>
  )
}

export default Layout
