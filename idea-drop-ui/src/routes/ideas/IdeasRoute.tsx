import { createRoute } from "@tanstack/react-router"

import { rootRoute } from "../RouteTree"

const IdeasPage = () => {
  return (
    <>Ideas Page Updated!</>
  )
}

const IdeasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideas",
  component: IdeasPage,
  head: () => ({
    meta: [
      { title: "IdeaHub - Browse Ideas" }
    ]
  })
})

export default IdeasRoute
