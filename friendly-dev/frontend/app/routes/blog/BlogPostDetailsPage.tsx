import { Link } from "react-router"
import Markdown from "react-markdown"

import { formatDate, getImageUrlOrNone } from "../../utils"
import NotFoundPage from "../NotFoundPage"

import type { Route } from "./+types/BlogPostDetailsPage"
import type { Post, ApiPost } from "../../types"

// To read markdown file
import fs from "node:fs/promises"
import path from "path"

type LoaderOutput = {
  markdown: string | null
  postMeta: Post
}

export const loader = async ({ request, params }: Route.LoaderArgs): Promise<LoaderOutput | null> => {
  const url = `${import.meta.env.VITE_API_URL}/posts/?populate=image&filters[slug][$eq]=${params.slug}`

  const response = await fetch(url)
  if (!response.ok) {
    return null
  }
  const apiPostsMeta = await response.json()

  if (apiPostsMeta.data.length === 0) {
    return null
  }

  const apiPost: ApiPost = apiPostsMeta.data[0]
  const postMeta: Post = {
    id: apiPost.id,
    documentId: apiPost.documentId,
    slug: apiPost.slug,
    title: apiPost.title,
    excerpt: apiPost.excerpt,
    date: apiPost.date,
    image: getImageUrlOrNone(apiPost.image?.url),
    body: apiPost.body,
  }

  // Import raw markdown from file with the same name of the slug
  const mdPath = path.join(process.cwd(), `/app/posts/${postMeta.slug}.md`)
  try {
    const data = await fs.readFile(mdPath, { encoding: "utf8" })

    // INFO: You can use markdown from strapi if you use postMeta.body instead of markdown
    return { postMeta, markdown: data }
  } catch (err) {
    console.error(err)
    return null
  }
}

const BlogPostDetailsPage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  if (!loaderData) {
    return <NotFoundPage />
  }

  const { postMeta: meta, markdown } = loaderData

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{meta.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{formatDate(new Date(meta.date).toString())}</p>

      <img src={meta.image} alt={meta.title} className="w-full h-64 object-cover rounded-md mb-6 dimmed-image" />

      <div className="prose prose-invert max-w-none mb-12 text-white">
        {/* Use markdown for local file and meta.body for strapi file */}
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
