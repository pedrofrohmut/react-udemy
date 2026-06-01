import { createRoute } from "@tanstack/react-router"

import { rootRoute } from "../RouteTree"

const IdeasDetailsPage = () => {
  const idea = IdeasDetailsRoute.useLoaderData()

  if (!idea) return <>No idea found</>

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
  const response = await fetch(`/api/ideas/${ideaId}`)
  if (!response.ok) return null
  const data = await response.json()
  return data
}

export default IdeasDetailsRoute
