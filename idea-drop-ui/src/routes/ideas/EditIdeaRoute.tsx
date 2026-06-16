import { createRoute, Link, useNavigate } from "@tanstack/react-router"
import { useMutation, useSuspenseQuery, queryOptions } from "@tanstack/react-query"
import { useRef } from "react"
import { toast } from "sonner"

import rootRoute from "@/routes/RootRoute"
import { editIdea, fetchIdea } from "@/api/ideas-api"
import { useAuth } from "@/context/AuthContext"

import type { Idea, EditIdea } from "@/types"

const EditIdeaPage = () => {
  const params = EditIdeaRoute.useParams()
  const navigate = useNavigate()
  const { accessToken } = useAuth()

  const { data } = useSuspenseQuery(ideaQueryOptions(params.ideaId))
  const idea: Idea = data

  if (!idea) return <>No idea found</>

  const titleRef = useRef<HTMLInputElement>(null)
  const summaryRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const tagsRef = useRef<HTMLInputElement>(null)

  const { mutateAsync } = useMutation({
    mutationFn: (updatedIdea: EditIdea) => editIdea(updatedIdea, accessToken),
    onSuccess: () => {
      navigate({ to: `/ideas/${params.ideaId}` })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const title = titleRef.current?.value.trim() || ""
    const summary = summaryRef.current?.value.trim() || ""
    const description = descriptionRef.current?.value.trim() || ""
    const tagsInput = tagsRef.current?.value.trim() || ""

    if (!title || !summary || !description) {
      alert("Please fill in all fields")
      return false
    }

    // Trim all then remove empty/blank tags
    const tags: Array<string> = tagsInput !== "" ? tagsInput.split(",").map(x => x.trim()).filter(x => x !== "") : []

    if (!accessToken) {
      toast.error("No accessToken provided")
      return
    }

    try {
      await mutateAsync({ id: params.ideaId, title, summary, description, tags })
    } catch (err) {
      console.error(err)
      alert("Something went wrong. A new idea could not be added.")
    }
  }

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Idea</h1>

        <Link to="/ideas/$ideaId" params={{ ideaId: params.ideaId }} className="text-sm text-blue-400 hover:underline">
           ← Back To Idea
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label htmlFor="title" className="block text-gray-200 font-medium mb-1">Title</label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter idea title"
            ref={titleRef}
            defaultValue={idea.title}
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-gray-200 font-medium mb-1">Summary</label>
          <input
            id="summary"
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter idea summary"
            ref={summaryRef}
            defaultValue={idea.summary}
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-gray-200 font-medium mb-1">Description</label>
          <textarea
            id="body"
            rows={6}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write out the description of your idea"
            ref={descriptionRef}
            defaultValue={idea.description}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-gray-200 font-medium mb-1">Tags</label>
          <input
            id="tags"
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="optional tags, comma separated"
            ref={tagsRef}
            defaultValue={idea.tags}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-gray-200 font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
             Update Idea
          </button>
        </div>
      </form>

    </div>
  )
}

const ideaQueryOptions = (ideaId: string) => {
  return queryOptions({
    queryKey: ["idea", ideaId],
    queryFn: () => fetchIdea(ideaId),
  })
}

const EditIdeaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideas/$ideaId/edit",
  component: EditIdeaPage,
  loader: ({ params, context }) => context.queryClient.ensureQueryData(ideaQueryOptions(params.ideaId)),
})

export default EditIdeaRoute
