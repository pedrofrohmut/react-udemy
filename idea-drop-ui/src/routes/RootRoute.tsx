import { createRootRouteWithContext, Outlet, HeadContent } from "@tanstack/react-router"
import { QueryClient } from "@tanstack/react-query"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"

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
      <HeadContent />
      <TanStackDevtools
        config={{ position: "bottom-right" }}
        plugins={[ { name: "TanStack Router", render: <TanStackRouterDevtoolsPanel /> } ]}
      />
    </>
  )
}

type RouterContext = {
  queryClient: QueryClient
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({head: () => {return {
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
})

export default rootRoute
