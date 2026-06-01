import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"
import { createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import routeTree from "./routes/RouteTree"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent", // Preloads stuff if not false
  scrollRestoration: true,
})

const main = () => {
  const rootElement = document.getElementById("app")!
  const reactRoot = ReactDOM.createRoot(rootElement)
  reactRoot.render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </QueryClientProvider>
  )
}

main()
