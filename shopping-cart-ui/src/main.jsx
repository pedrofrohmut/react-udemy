import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { ProductsProvider } from "./context/products-context.jsx"
import { CartProvider } from "./context/cart-context.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>
)
