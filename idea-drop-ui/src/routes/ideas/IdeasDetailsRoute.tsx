import { createRoute, Link, useNavigate } from "@tanstack/react-router"
import { queryOptions, useSuspenseQuery, useMutation } from "@tanstack/react-query"

import rootRoute from "../RootRoute"
import { fetchIdea, deleteIdea } from "@/ideas-api"

import type { Idea } from "@/types"

const IdeasDetailsPage = () => {
  const params = IdeasDetailsRoute.useParams()
  const navigate = useNavigate()

  const { data } = useSuspenseQuery(ideaQueryOptions(params.ideaId))
  const idea: Idea = data

  if (!idea) return <>No idea found</>

  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteIdea(id),
    onSuccess: () => {
      navigate({ to: "/ideas" })
    },
  })

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete?")) {
      return
    }

    await mutateAsync(idea.id)
  }

  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-400 hover:text-blue-600 underline block mb-4">Back to Ideas</Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>
      <button
        className="text-gray-200 bg-blue-600 py-1 px-4 mt-4 rounded-md"
        onClick={() => navigate({ to: `/ideas/${idea.id}/edit` })}
      >
        Edit
      </button>
      <button
        className="text-gray-200 bg-red-600 rounded-md py-1 px-4 mt-4 ml-4"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
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
