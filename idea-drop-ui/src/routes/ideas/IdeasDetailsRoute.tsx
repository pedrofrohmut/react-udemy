import { createRoute } from "@tanstack/react-router"

import { rootRoute } from "../router"

const IdeasDetailsPage = () => {
  const idea = IdeasDetailsRoute.useLoaderData()

  return (
    <>{idea.title}</>
  )
}

const IdeasDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideas/$ideaId",
  component: IdeasDetailsPage,
  loader: async ({ params }) => {
    return fetchIdea(params.ideaId)
  },
})

const fetchIdea = async (ideaId: string) => {
  const response = await fetch(`http://localhost:5000/ideas/${ideaId}`)
  if (!response.ok) return null
  const data = await response.json()
  return data
}

export default IdeasDetailsRoute
