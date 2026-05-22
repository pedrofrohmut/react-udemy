import { Link } from "react-router"
import type { PostMeta } from "../types"
import { formatDate, sortedPostsByDateDesc } from "../utils"
import PostCard from "./PostCard"

type LatestPostsProps = {
  posts: Array<PostMeta> | null
  limit?: number
}

const LatestPosts: React.FC<LatestPostsProps> = ({ posts, limit = 3 }) => {
  if (!posts || !Array.isArray(posts) || !limit) {
    return null
  }

  const sorted = sortedPostsByDateDesc(posts)
  const latest = sorted.slice(0, limit)

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-white mt-12">🔥 Latest Posts</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latest.map((post: PostMeta) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.id}
            className="block p-4 border border-gray-700 rounded-lg bg-gray-800 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-400 mb-1">{post.title}</h3>
            <p className="text-sm text-gray-300">{post.excerpt}</p>
            <p className="mt-3 text-xs text-gray-400">{formatDate(post.date)}</p>
          </Link>
        ))}
      </div>
    </>
  )
}

export default LatestPosts
