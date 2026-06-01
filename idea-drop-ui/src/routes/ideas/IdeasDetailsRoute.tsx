import { createRoute, Link } from "@tanstack/react-router"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

import rootRoute from "../RootRoute"
import api from "@/lib/axios"

import type { Idea } from "@/types"

const IdeasDetailsPage = () => {
  const params = IdeasDetailsRoute.useParams()
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(params.ideaId))

  if (!idea) return <>No idea found</>

  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-400 hover:text-blue-600 underline block mb-4">
        Back to Ideas
      </Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>
    </div>
  )
}

const fetchIdea = async (ideaId: string): Promise<Idea> => {
  const response = await api.get(`/ideas/${ideaId}`)
  return response.data
}

const ideaQueryOptions = (ideaId: string) => {
  return queryOptions({
    queryKey: ["idea", ideaId],
    queryFn: () => fetchIdea(ideaId),
  })
}

const IdeasDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideas/$ideaId",
  component: IdeasDetailsPage,
  loader: ({ params, context }) => context.queryClient.ensureQueryData(ideaQueryOptions(params.ideaId)),
})

export default IdeasDetailsRoute
