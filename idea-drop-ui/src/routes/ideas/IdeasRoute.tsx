import { createRoute, Link } from "@tanstack/react-router"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"

import { rootRoute } from "../RouteTree"
import api from "@/lib/axios"

import type { Idea } from "@/types"

const IdeasPage = () => {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions())

  if (!ideas || ideas.length === 0) return null

  return (
    <div className="p-4 max-w-[1100px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ideas</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ideas.map((idea: Idea) => (
          <li key={idea.id} className="border border-gray-300 p-4 rounded grid">
            <div>
              <h2 className="text-lg font-semibold">{idea.title}</h2>
              <p className="text-gray-400 mt-2">{idea.summary}</p>
            </div>
            <Link
              to="/ideas/$ideaId"
              params={{ ideaId: idea.id.toString() }}
              className="text-blue-400 mt-2 underline hover:text-blue-600"
            >
               Read More
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const fetchIdeas = async (): Promise<Array<Idea>> => {
  const response = await api.get("/ideas")
  return response.data
}

const ideasQueryOptions = () => {
  return queryOptions({
    queryKey: ["ideas"],
    queryFn: () => fetchIdeas(),
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
  loader: ({ context }) => {
    const { queryClient } = context
    return queryClient.ensureQueryData(ideasQueryOptions())
  },
})

export default IdeasRoute
