import { createRootRoute, createRouter } from "@tanstack/react-router"

import HomeRoute from "./HomeRoute"
import AboutRoute from "./AboutRoute"
import IdeasRoute from "./ideas/IdeasRoute"

import RootComponent from "./__root"

export const rootRoute = createRootRoute({
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
})

const routeTree = rootRoute.addChildren([
  HomeRoute,
  AboutRoute,
  IdeasRoute,
])

const router = createRouter({ routeTree })

export default router
