import { createRoute } from "@tanstack/react-router"

import { rootRoute } from "./router"

const HomePage = () => {
  return (
    <>Home Page</>
  )
}

const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
})

export default HomeRoute
