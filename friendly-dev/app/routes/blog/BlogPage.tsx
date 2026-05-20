import PostCard from "../../components/PostCard"
import type { Route } from "./+types/BlogPage"
import type { PostMeta } from "~/types"

export const loader = async ({ request }: Route.LoaderArgs): Promise<Array<PostMeta>> => {
  const url = new URL("/posts-meta.json", request.url)
  const response = await fetch(url.href)
  if (!response.ok) {
    throw new Error("Fail to fetch data from: /posts-meta.json")
  }
  return await response.json()
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const postsMeta = loaderData

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6">
      <h2 className="text-3xl text-white font-bold mb-8">📝 Blog</h2>

      <div className="flex flex-col gap-4">
        {postsMeta.map((postMeta: PostMeta) => (
          <PostCard key={postMeta.slug} postMeta={postMeta} />
        ))}
      </div>
    </div>
  )
}

export default BlogPage
