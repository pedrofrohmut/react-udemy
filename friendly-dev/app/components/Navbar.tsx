import { useState } from "react"
import { FaBars, FaLaptopCode, FaTimes } from "react-icons/fa"
import { NavLink } from "react-router"

type NavStates = {
  isActive?: boolean
  isPending?: boolean
  isTransitioning?: boolean
}

const navClasses = ({ isActive }: NavStates) =>
  isActive ? "text-blue-400 font-semibold" : "transition hover:text-blue-400"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev)
  }

  const MyNavLink = ({ to, text }: { to: string; text: string }) => (
    <NavLink to={to} className={navClasses} onClick={() => setIsMenuOpen(false)}>
      {text}
    </NavLink>
  )

  const Links = () => (
    <>
      <MyNavLink to="/" text="Home" />
      <MyNavLink to="/about" text="About" />
      <MyNavLink to="/contact" text="Contact" />
      <MyNavLink to="/projects" text="Projects" />
      <MyNavLink to="/blog" text="Blog" />
    </>
  )

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto md:flex justify-between items-center">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-lg font-bold text-blue-300"
          >
            <FaLaptopCode className="text-blue-400 text-xl" />
            <span>The Friendly Dev</span>
          </NavLink>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={handleToggleMenu} className="text-blue-400 text-xl">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 space-x-4 text-sm text-gray-300">
            <Links />
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
              <Links />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
