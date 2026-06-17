import { createRoute, useNavigate } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"

import { createIdea } from "@/api/ideas-api"
import rootRoute from "@/routes/RootRoute"

import type { NewIdea } from "@/types"

const NewIdeaPage = () => {
  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null)
  const summaryRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const tagsRef = useRef<HTMLInputElement>(null)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (newIdea: NewIdea) => createIdea(newIdea),
    onSuccess: () => {
      navigate({ to: "/ideas" })
    },
  })

  const handleSubmit = async (e: React.SubmitEvent) => {
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

    try {
      await mutateAsync({ title, summary, description, tags })
    } catch (err) {
      console.error(err)
      alert("Something went wrong. A new idea could not be added.")
    }
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold mb-6">Create New Idea</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-300 font-medium mb-1">Title</label>
          <input
            id="title"
            type="text"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter idea title"
            ref={titleRef}
          />
        </div>

        <div>
          <label htmlFor="summary" className="block text-gray-300 font-medium mb-1">Summary</label>
          <input
            id="summary"
            type="text"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter idea summary"
            ref={summaryRef}
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-gray-300 font-medium mb-1">Description</label>
          <textarea
            id="body"
            rows={6}
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Write out the description of your idea"
            ref={descriptionRef}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-gray-300 font-medium mb-1">Tags</label>
          <input
            id="tags"
            type="text"
            className="w-full border border-gray-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="optional tags, comma separated"
            ref={tagsRef}
          />
        </div>

        <div className="mt-5">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-800 text-gray-200 font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating..." : "Create Idea"}
          </button>
        </div>

      </form>

    </div>
  )
}

const NewIdeaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ideas/new",
  component: NewIdeaPage,
})

export default NewIdeaRoute
