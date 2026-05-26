import { Link } from "react-router"
import { formatDate } from "../utils"
import type { Post } from "~/types"

type PostCardProps = {
  postMeta: Post
}

const PostCard: React.FC<PostCardProps> = ({ postMeta }) => {
  return (
    <article className="bg-gray-900 p-6 rounded-lg shadow">
      <h3 className="text-2xl font-semibold text-blue-400">{postMeta.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{formatDate(postMeta.date)}</p>
      {postMeta.image && (
        <img src={postMeta.image} alt={postMeta.title} className="w-full h-48 object-cover rounded-md mb-4 dimmed-image" />
      )}
      <p className="text-gray-300 mb-4">{postMeta.excerpt}</p>
      <Link to={`/blog/${postMeta.slug}`} className="text-blue-300 text-sm hover:underline hover:text-blue-500">
        Read More ⭢
      </Link>
    </article>
  )
}

export default PostCard
