import { createRoute } from "@tanstack/react-router"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

import rootRoute from "../RootRoute"
import IdeaCard from "@/components/IdeaCard"
import { fetchRecentIdeas } from "@/ideas-api"

import type { Idea } from "@/types"

const IdeasPage = () => {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions())

  if (!ideas || ideas.length === 0) return null

  return (
    <div className="p-4 max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ideas</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ideas.map((idea: Idea) => (
          <IdeaCard idea={idea} key={idea.id} />
        ))}
      </ul>
    </div>
  )
}

const ideasQueryOptions = () => {
  return queryOptions({
    queryKey: ["ideas"],
    queryFn: () => fetchRecentIdeas(),
  })
}

const IdeasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideas",
  component: IdeasPage,
  head: () => ({
    meta: [
      { title: "IdeaHub - Browse Ideas" }
    ]
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(ideasQueryOptions()),
})

export default IdeasRoute
