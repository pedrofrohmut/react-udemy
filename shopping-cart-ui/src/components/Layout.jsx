import { FaShoppingCart } from "react-icons/fa"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col">
      <header>
        <h1 className="text-3xl font-bold mb-6 text-gray-200 flex items-center gap-3">
          <FaShoppingCart /> Product Catalog
        </h1>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="text-center py-1 text-sm text-gray-500">Shopping Cart UI 2026 &copy;</footer>
    </div>
  )
}

export default Layout
