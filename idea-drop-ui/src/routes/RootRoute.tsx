import { createRootRouteWithContext, Outlet, HeadContent, Link } from "@tanstack/react-router"
import { QueryClient } from "@tanstack/react-query"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { Toaster } from "sonner"

import "../styles.css"

import Header from "../components/Header"

const RootComponent = () => {
  return (
    <>
      <div className="min-h-screen _bg-secondary">
        <Header />
        <main className="flex justify-center p-6">
          <div className="w-full max-w-4xl p-8 _bg-main rounded-2xl">
            <Outlet />
          </div>
        </main>
      </div>

      <Toaster />

      <HeadContent />

      <TanStackDevtools
        config={{ position: "bottom-right" }}
        plugins={[ { name: "TanStack Router", render: <TanStackRouterDevtoolsPanel /> } ]}
      />
    </>
  )
}

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-6">Ooops! The page you are looking for does not exist</p>
      <Link to="/" className="px-6 py-2 bg-blue-600 text-gray-300 rounded-md hover:bg-blue-800 transition">
        Go back home
      </Link>
    </div>
  )
}

type RouterContext = {
  queryClient: QueryClient
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  head: () => {
    return {
      meta: [
        { title: "IdeaDrop - Your Idea Hub" },
        {
          name: "description",
          content: "Share, explore and build on the best startup ideas and side hustles",
        },
      ]
    }
  },
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

export default rootRoute
