import { createRoute } from "@tanstack/react-router"

import { rootRoute } from "./RouteTree"

const AboutPage = () => {
  return (
    <>About Page</>
  )
}

const AboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
})

export default AboutRoute
