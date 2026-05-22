import { useState } from "react"
import PostCard from "../../components/PostCard"
import Pagination from "../../components/Pagination"
import PostsFilter from "../../components/PostsFilter"

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
  const [searchQuery, setSearchQuery] = useState<string>("")

  const postsMeta = loaderData

  const filteredPosts = postsMeta.filter((post: PostMeta) => {
    const search = searchQuery.toLowerCase()
    const title = post.title.toLowerCase()
    const excerpt = post.excerpt.toLowerCase()

    return title.includes(search) || excerpt.includes(search)
  })

  const postsPerPage = 2
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const first = postsPerPage * (currentPage - 1)
  const currentPosts = filteredPosts.slice(first, first + postsPerPage)

  const handlePageChange = (n: number) => setCurrentPage(n)

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6">
      <h2 className="text-3xl text-white font-bold mb-8">📝 Blog</h2>

      <PostsFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {currentPosts.length === 0 && <p className="text-gray-400 text-center">No posts found</p>}

      <div className="flex flex-col gap-4">
        {currentPosts.length > 0 &&
          currentPosts.map((postMeta: PostMeta) => <PostCard key={postMeta.slug} postMeta={postMeta} />)}
      </div>

      <Pagination numberOfPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </div>
  )
}

export default BlogPage
