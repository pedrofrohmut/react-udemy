import { createRootRoute, createRouter } from "@tanstack/react-router"

import RootComponent from "./__root"

import HomeRoute from "./HomeRoute"
import AboutRoute from "./AboutRoute"
import IdeasRoute from "./ideas/IdeasRoute"
import IdeasDetailsRoute from "./ideas/IdeasDetailsRoute"

export const rootRoute = createRootRoute({head: () => {return {
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
  IdeasDetailsRoute,
])

const router = createRouter({ routeTree })

export default router
