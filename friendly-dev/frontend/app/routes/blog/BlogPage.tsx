import { useState } from "react"

import PostCard from "../../components/PostCard"
import Pagination from "../../components/Pagination"
import PostsFilter from "../../components/PostsFilter"
import { getImageUrlOrNone } from "../../utils"

import type { Route } from "./+types/BlogPage"
import type { Post, ApiPost } from "~/types"

type CachedPost = Post & { lowerTitle: string; lowerExcerpt: string }

export const loader = async ({ request }: Route.LoaderArgs): Promise<Array<CachedPost> | null> => {
  // const url = new URL("/posts-meta.json", request.url)
  const url = `${import.meta.env.VITE_API_URL}/posts?populate=*&sort=date:desc`

  const response = await fetch(url)
  if (!response.ok) {
    // throw new Error("Fail to fetch data from: /posts-meta.json")
    return null
  }
  const apiPosts = await response.json()

  const posts = apiPosts.data.map((post: ApiPost) => ({
    id: post.id,
    documentId: post.documentId,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    image: getImageUrlOrNone(post.image?.url),
  }))

  const withCache = posts.map((postMeta: Post) =>
    Object.assign(postMeta, {
      lowerTitle: postMeta.title.toLowerCase(),
      lowerExcerpt: postMeta.excerpt.toLowerCase()
    })
  )

  return withCache
}


type FilterResult = { currentPosts: Array<CachedPost>; totalPages: number }

const filterPosts = (posts: Array<CachedPost> | null, currentPage: number, searchQuery: string): FilterResult => {
  if (posts === null) {
    return { currentPosts: [], totalPages: 0 }
  }

  const filteredPosts = posts.filter((post: CachedPost) => (
    post.lowerTitle.includes(searchQuery) || post.lowerExcerpt.includes(searchQuery)
  ))

  const postsPerPage = 2
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const first = postsPerPage * (currentPage - 1)
  const currentPosts = filteredPosts.slice(first, first + postsPerPage)

  return { currentPosts, totalPages }
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState<string>("")

  const posts = loaderData
  const { currentPosts, totalPages } = filterPosts(posts, currentPage, searchQuery)

  const handlePageChange = (n: number) => setCurrentPage(n)

  const handleSearchChange = (query: string) => {
    setSearchQuery(query.toLowerCase())
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6">
      <h2 className="text-3xl text-white font-bold mb-8">📝 Blog</h2>

      <PostsFilter searchQuery={searchQuery} handleSearchChange={handleSearchChange} />

      {currentPosts.length === 0 && <p className="text-gray-400 text-center">No posts found</p>}

      <div className="flex flex-col gap-4">
        {currentPosts.length > 0 && currentPosts.map((postMeta: Post) => (
            <PostCard key={postMeta.slug} postMeta={postMeta} />
        ))}
      </div>

      <Pagination numberOfPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </div>
  )
}

export default BlogPage
