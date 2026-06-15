import { useRef } from "react"
import { createRoute, Link } from "@tanstack/react-router"

import authRoute from "@/routes/auth/AuthRoute"

const SignUpPage = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      <form className="space-y-4">

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-300 font-medium mb-1">Name</label>
          <input
            id="name"
            type="text"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name..."
            autoComplete="off"
            ref={nameRef}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-300 font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email..."
            autoComplete="off"
            ref={emailRef}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-300 font-medium mb-1">Password</label>
          <input
            id="password"
            type="text"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password..."
            autoComplete="off"
            ref={passwordRef}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-gray-300 font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign Up
          </button>
        </div>

      </form>

      <div className="text-sm mt-4">
        Already have an account? {" "}
        <Link to="/auth/signin" className="text-blue-400 font-medium hover:underline ml-1">Sign In</Link>
      </div>

    </div>
  )
}

const SignUpRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/signup",
  component: SignUpPage,
})

export default SignUpRoute
