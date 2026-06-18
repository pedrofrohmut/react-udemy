import { createRoute, Link, useNavigate } from "@tanstack/react-router"
import { queryOptions, useSuspenseQuery, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { isAxiosError } from "axios"

import rootRoute from "../RootRoute"
import { fetchIdea, deleteIdea } from "@/api/ideas-api"
import { useAuth } from "@/context/AuthContext"

import type { Idea } from "@/types"

const IdeasDetailsPage = () => {
  const params = IdeasDetailsRoute.useParams()
  const navigate = useNavigate()
  const { user: authUser } = useAuth()

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

    try {
      await mutateAsync(idea.id)
    } catch (err: any) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Failed to get axios error message")
      } else {
        toast.error("Error: could not delete an idea.")
        console.error("[ERROR] error to delete idea: " + err.message || "")
      }
    }
  }

  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-400 hover:text-blue-600 underline block mb-4">Back to Ideas</Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-3">{idea.description}</p>

      <div className="mt-4">
        <span className="mr-2">Tags: </span>
        {idea.tags?.length > 0 && (
          idea.tags.map(tag => (
            <span key={tag}>#{tag} </span>
          ))
        )}
      </div>

      {authUser?.id === idea?.userId && (
        <>
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
        </>
      )}
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
