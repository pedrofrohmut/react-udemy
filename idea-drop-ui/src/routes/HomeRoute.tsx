import { createRoute, Link } from "@tanstack/react-router"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { Lightbulb } from "lucide-react"

import rootRoute from "./RootRoute"
import api from "@/lib/axios"
import IdeaCard from "@/components/IdeaCard"

import type { Idea } from "@/types"

const HomePage = () => {
  const { data: recentIdeas } = useSuspenseQuery(recentIdeasQueryOptions())

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-10 p-6 text-blue-900">

      <div className="flex flex-col items-start gap-4">
        <Lightbulb className="w-16 h-16 text-yellow-300" />
        <h1 className="text-4xl font-bold text-gray-200">Welcome to IdeaDrop</h1>
        <p className="text-gray-400 max-w-xs">Share, explore, and build on the best startup ideas and side hustles.</p>
      </div>

      <section className="flex-1">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Latest Ideas</h2>

        <ul className="space-y-6">
          {recentIdeas && recentIdeas.map((idea: Idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </ul>

        <div className="mt-6">
          <Link to="/ideas" className="text-blue-400 hover:text-blue-600">View All Ideas</Link>
        </div>
      </section>

    </div>
  )
}

const fetchRecentIdeas = async (): Promise<Array<Idea>> => {
  const response = await api.get("/ideas")
  const ideas = response.data
  const sorted = ideas.sort((a: Idea, b: Idea) => {
    const bTime = new Date(b.createdAt).getTime()
    const aTime = new Date(a.createdAt).getTime()
    return bTime - aTime
  })
  return sorted.slice(0, 3)
}

const recentIdeasQueryOptions = () => {
  return queryOptions({
    queryKey: ["recentIdeas"],
    queryFn: () => fetchRecentIdeas(),
  })
}

const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
  loader: ({ context }) => context.queryClient.ensureQueryData(recentIdeasQueryOptions()),
})

export default HomeRoute
