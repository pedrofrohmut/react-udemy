import type { Route } from "./+types/HomePage"
import type { Project, PostMeta, ApiProject, ApiPost } from "../types"
import AboutPreview from "../components/AboutPreview"
import FeaturedProjects from "../components/FeaturedProjects"
import LatestPosts from "../components/LatestPosts"

const FEATURED_PROJECTS_COUNT = 2
const LATEST_POSTS_COUNT = 3

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: "The Friendly Dev" }, { name: "description", content: "Custom Website development" }]
}

type LoaderData = {
  projects: Array<Project> | null
  posts: Array<PostMeta> | null
  error: Error | null
}

export const loader = async ({ request }: Route.LoaderArgs): Promise<LoaderData> => {
  // Filtering isFeatured == true projects in the url. Backend filtering
  const projectsUrl = `${import.meta.env.VITE_API_URL}/projects?filters[isFeatured][$eq]=true` // From strapi

  // const postsUrl = new URL("/posts-meta.json", request.url) // From file
  const postsUrl = `${import.meta.env.VITE_API_URL}/posts?populate=*&sort=date:desc&pagination[limit]=${LATEST_POSTS_COUNT}` // From strapi

  try {
    const [projectsResponse, postsResponse] = await Promise.all([fetch(projectsUrl), fetch(postsUrl)])

    if (!projectsResponse.ok || !postsResponse.ok) {
      throw new Error("Fetch response not ok")
    }

    const apiPosts = await postsResponse.json()
    const posts = apiPosts.data.map((post: ApiPost) => ({
      id: post.id,
      documentId: post.documentId,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      image: "",
    }))

    const apiProjects = await projectsResponse.json()
    const projects = apiProjects.data.map((project: ApiProject) => ({
      id: project.id,
      documentId: project.documentId,
      title: project.title,
      description: project.description,
      image: "",
      url: project.url,
      date: project.date,
      category: project.category,
      isFeatured: project.isFeatured
    }))

    return { projects, posts, error: null }
  } catch (err: any) {
    const fetchErr = new Error(`Error to fetch project and/or posts from API: ${err.message || ""}`)
    fetchErr.stack = err.stack || ""
    return { projects: null, posts: null, error: fetchErr }
  }
}

const HomePage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const { projects, posts, error } = loaderData

  return (
    <>
      {error && <div className="">🚫 {error.message}</div>}
      {!error && <FeaturedProjects projects={projects} count={FEATURED_PROJECTS_COUNT} />}
      <AboutPreview />
      {!error && <LatestPosts posts={posts} limit={LATEST_POSTS_COUNT} />}
    </>
  )
}

export default HomePage
