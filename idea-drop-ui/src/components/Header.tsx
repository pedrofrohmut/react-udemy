import { Link, useNavigate } from "@tanstack/react-router"
import { Lightbulb } from "lucide-react"
import { toast } from "sonner"

import { useAuth } from "@/context/AuthContext"
import { signOutUser } from "@/api/auth-api"

const Header = () => {
  const { user, accessToken, setUser, setAccessToken } = useAuth()

  const navigate = useNavigate()

  const handleSignOut = async () => {
    if (!confirm("Are you sure you want to Sign Out?")) {
      return
    }

    setUser(null)
    setAccessToken(null)

    await signOutUser()
    toast.success("User signed out.")

    navigate({ to: "/" })
  }

  return (
    <header className="_bg-main">
      <div className="container mx-auto px-6 py-4 flex">

        <div className="flex items-center space-x-2 text-gray-200">
          <Link to="/" className="flex items-center space-x-2 text-gray-200">
            <Lightbulb className="w-6 h-6 text-yellow-300" />
            <h1 className="text-2xl font-bold">IdeaDrop</h1>
          </Link>
        </div>

        <div className="flex-1 space-y-3 ml-3 flex flex-col items-end md:flex-row md:justify-between md:items-center md:space-y-0">
          <div className="flex-1 flex items-center gap-5 justify-center">
            <Link
              to="/"
              className="text-gray-200 hover:text-gray-400 transition px-1 py-2 leading-none"
            >
              Home
            </Link>

            <Link
              to="/ideas"
              className="text-gray-200 hover:text-gray-400 transition px-1 py-2 leading-none"
            >
              Ideas
            </Link>

            {/* Only for signed users */}
            {user && accessToken && (
              <Link
                to="/ideas/new"
                className="bg-blue-600 hover:bg-blue-800 text-gray-200 transition px-4 py-2 rounded-md leading-none"
              >
                + New Idea
              </Link>
            )}
          </div>

          <div className="flex gap-5 items-center">
            {/* Public Links */}
            {!user && !accessToken && (
              <>
                <Link
                  to="/auth/signin"
                  className="text-gray-200 hover:text-gray-400 transition px-3 py-2 leading-none"
                >
                   Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-(--bg-secondary) hover:bg-(--bg-darker) text-gray-200 transition px-4 py-2 rounded-md leading-none"
                >
                   Sign Up
                </Link>
              </>
            )}

            {/* Signed User Links */}
            {user && accessToken && (
              <>
                <span className="text-gray-300 text-sm font-lg">Welcome, {user.name}.</span>
                <button
                  onClick={handleSignOut}
                  className="bg-(--bg-secondary) hover:bg-(--bg-darker) text-sm transition px-4 py-1 rounded-md"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header
