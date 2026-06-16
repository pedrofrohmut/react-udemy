import { useState } from "react"
import { createRoute, Link, useNavigate } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import authRoute from "@/routes/auth/AuthRoute"
import { signInUser } from "@/api/auth-api"
import type { SignInCredentials, SignedUser } from "@/types"
import { useAuth } from "@/context/AuthContext"

const SignInPage = () => {
  const navigate = useNavigate()
  const { setAccessToken, setUser } = useAuth()

  const [error, setError] = useState<string | null>(null)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (credentials: SignInCredentials) => signInUser(credentials),
    onSuccess: () => {
      navigate({ to: "/" })
    },
    onError: (err: any) => {
      setError("Something went wrong. Could not sign in the user.")
      console.log(err.message)
    },
  })

  const handleSubmit = async (e: React.SubmitEvent): Promise<void> => {
    e.preventDefault()

    const emailInput = e.target.email.value || ""
    const passwordInput = e.target.password.value || ""

    if (!emailInput || !passwordInput) {
      setError("Please, fill in all the fields.")
      return
    }

    const credentials = { email: emailInput, password: passwordInput }
    const { userId, email, name, accessToken } = await mutateAsync(credentials) as SignedUser

    const token = accessToken || null
    const user = userId && name && email ? { id: userId, email, name } : null

    // Save to authContext
    setAccessToken(token)
    setUser(user)

    // Save to localStorage
    localStorage.setItem("accessToken", JSON.stringify(token))
    localStorage.setItem("signedUser", JSON.stringify(user))

    toast.success("Success: users authenticated.")
  }

  return (
    <div className="max-w-md mx-auto">

      <h1 className="text-3xl font-bold mb-6">Sign In</h1>

      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-300 font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email..."
            autoComplete="off"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-300 font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password..."
            autoComplete="off"
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-gray-300 font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </div>

      </form>

      <div className="text-sm mt-4">
        Does not have an account? {" "}
        <Link to="/auth/signup" className="text-blue-400 font-medium hover:underline ml-1">Sign Up</Link>
      </div>

    </div>
  )
}

const SignInRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "/signin",
  component: SignInPage,
})

export default SignInRoute
