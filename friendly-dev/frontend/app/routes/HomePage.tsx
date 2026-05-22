import type { Route } from "./+types/HomePage"
import type { Project, PostMeta } from "../types"
import AboutPreview from "../components/AboutPreview"
import FeaturedProjects from "../components/FeaturedProjects"
import LatestPosts from "../components/LatestPosts"

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: "The Friendly Dev" }, { name: "description", content: "Custom Website development" }]
}

type LoaderData = {
  projects: Array<Project> | null
  posts: Array<PostMeta> | null
  error: Error | null
}

export const loader = async ({ request }: Route.LoaderArgs): Promise<LoaderData> => {
  const isDevelopment = import.meta.env.DEV
  const projectsUrl = isDevelopment ? `${import.meta.env.VITE_API_URL}/projects` : "production-url"
  const postsUrl = new URL("/posts-meta.json", request.url)

  try {
    const [projectsResponse, postsResponse] = await Promise.all([fetch(projectsUrl), fetch(postsUrl)])
    if (!projectsResponse.ok || !postsResponse.ok) {
      throw new Error("Failed to fetch projects and/or posts")
    }
    const [projects, posts] = await Promise.all([projectsResponse.json(), postsResponse.json()])
    return {
      projects,
      posts,
      error: null
    }
  } catch (err: any) {
    const fetchErr = new Error(`Error to fetch project and/or posts from API: ${err.message || ""}`)
    fetchErr.stack = err.stack || ""
    return {
      projects: null,
      posts: null,
      error: fetchErr
    }
  }
}

const HomePage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const { projects, posts, error } = loaderData

  return (
    <>
      {error && <div className="">🚫 {error.message}</div>}
      {!error && projects && <FeaturedProjects projects={projects} count={2} />}
      <AboutPreview />
      {!error && posts && <LatestPosts posts={posts} limit={3} />}
    </>
  )
}

export default HomePage
