import { Outlet, createRoute } from "@tanstack/react-router"
import { Lightbulb } from "lucide-react"

import rootRoute from "@/routes/RootRoute"

const AuthLayoutComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-blue-900">

      <div className="flex flex-col items-start gap-4">
        <Lightbulb className="w-16 h-16 text-yellow-300" />
        <h1 className="text-4xl font-bold text-gray-200">Welcome to IdeaDrop</h1>
        <p className="text-gray-400 max-w-xs">Share, explore, and build on the best startup ideas and side hustles.</p>
      </div>

      <section className="flex-1 text-gray-200">
        <Outlet />
      </section>

    </div>
  )
}

const AuthLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: AuthLayoutComponent,
})

export default AuthLayout
