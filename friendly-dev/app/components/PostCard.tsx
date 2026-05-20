import { Link } from "react-router"
import { formatDate } from "../utils"
import type { PostMeta } from "~/types"

type PostCardProps = {
  postMeta: PostMeta
}

const PostCard: React.FC<PostCardProps> = ({ postMeta }) => {
  return (
    <article className="bg-gray-900 p-6 rounded-lg shadow">
      <h3 className="text-2xl font-semibold text-blue-400">{postMeta.title}</h3>
      <p className="text-sm text-gray-400 mb-2">{formatDate(postMeta.date)}</p>
      <p className="text-gray-300 mb-4">{postMeta.excerpt}</p>
      <Link to={`/blog/${postMeta.slug}`} className="text-blue-300 text-sm hover:underline hover:text-blue-500">
        Read More ⭢
      </Link>
    </article>
  )
}

export default PostCard
