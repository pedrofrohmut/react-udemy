import { useState } from "react"
import PostCard from "../../components/PostCard"
import Pagination from "../../components/Pagination"

import type { Route } from "./+types/BlogPage"
import type { PostMeta } from "~/types"

export const loader = async ({ request }: Route.LoaderArgs): Promise<Array<PostMeta>> => {
  const url = new URL("/posts-meta.json", request.url)
  const response = await fetch(url.href)
  if (!response.ok) {
    throw new Error("Fail to fetch data from: /posts-meta.json")
  }
  const data: Array<PostMeta> = await response.json()
  return data.sort((a: PostMeta, b: PostMeta) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const postsMeta = loaderData

  const postsPerPage = 2
  const totalPages = Math.ceil(postsMeta.length / postsPerPage)

  const first = postsPerPage * (currentPage - 1)
  const currentPosts = postsMeta.slice(first, first + postsPerPage)

  const handlePageChange = (n: number) => setCurrentPage(n)

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6">
      <h2 className="text-3xl text-white font-bold mb-8">📝 Blog</h2>

      <div className="flex flex-col gap-4">
        {currentPosts.map((postMeta: PostMeta) => (
          <PostCard key={postMeta.slug} postMeta={postMeta} />
        ))}
      </div>

      <Pagination numberOfPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </div>
  )
}

export default BlogPage
