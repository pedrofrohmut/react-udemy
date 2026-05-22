import { Link } from "react-router"
import Markdown from "react-markdown"
import type { Route } from "./+types/BlogPostDetailsPage"
import type { PostMeta } from "../../types"
import { formatDate } from "../../utils"

type LoaderOutput = {
  markdown: string
  postMeta: PostMeta
}

export const loader = async ({ request, params }: Route.LoaderArgs): Promise<LoaderOutput> => {
  const url = new URL("/posts-meta.json", request.url)
  const response = await fetch(url.href)
  if (!response.ok) {
    throw new Error("Failed to fetch data from 'posts-meta.json'")
  }
  const postsMeta = await response.json()

  // Get PostMeta from 'posts-meta.json' by params.slug
  const postMeta = postsMeta.find((postMeta: PostMeta) => postMeta.slug === params.slug)
  if (!postMeta) {
    throw new Response("Not found", { status: 404 })
  }

  // Import raw markdown from file with the same name of the slug
  const markdown = await import(`../../posts/${params.slug}.md?raw`)

  return { postMeta, markdown: markdown.default }
}

const BlogPostDetailsPage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const { postMeta: meta, markdown } = loaderData

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{meta.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{formatDate(new Date(meta.date).toString())}</p>

      <div className="prose prose-invert max-w-none mb-12 text-white">
        <Markdown>{markdown}</Markdown>
      </div>

      <Link
        to="/blog"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        Back To Posts
      </Link>
    </div>
  )
}

export default BlogPostDetailsPage
