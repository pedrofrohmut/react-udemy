import { Link } from "@tanstack/react-router"
import { Lightbulb } from "lucide-react"

const Header = () => {
  return (
    <header className="_bg-main">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center space-x-2 text-gray-200">
          <Link to="/" className="flex items-center space-x-2 text-gray-200">
            <Lightbulb className="w-6 h-6 text-yellow-300" />
            <h1 className="text-2xl font-bold">IdeaDrop</h1>
          </Link>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-200 hover:text-gray-400 font-medium transition px-3 py-2 leading-none"
          >
            Home
          </Link>

          <Link
            to="/ideas"
            className="text-gray-200 hover:text-gray-400 font-medium transition px-3 py-2 leading-none"
          >
            Ideas
          </Link>

          <Link
            to="/ideas/new"
            className="bg-blue-600 hover:bg-blue-800 text-gray-200 font-medium transition px-4 py-2 rounded-md leading-none"
          >
            + New Idea
          </Link>
        </nav>

      </div>
    </header>
  )
}

export default Header
