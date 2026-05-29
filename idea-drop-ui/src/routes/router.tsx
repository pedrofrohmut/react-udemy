import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router"

import HomePage from "./HomePage"
import AboutPage from "./AboutPage"
import IdeasPage from "./ideas/IdeasPage"
import RootComponent from "./__root"

const rootRoute = createRootRoute({
  component: RootComponent,
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
})

const ideasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideas",
  component: IdeasPage,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  ideasRoute,
])

const router = createRouter({ routeTree })

export default router
