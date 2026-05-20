import type { Route } from "./+types/HomePage"
import type { Project } from "../types"
import AboutPreview from "../components/AboutPreview"
import FeaturedProjects from "../components/FeaturedProjects"

export const meta = ({}: Route.MetaArgs) => {
  return [{ title: "The Friendly Dev" }, { name: "description", content: "Custom Website development" }]
}

export const loader = async ({}: Route.LoaderArgs): Promise<Array<Project>> => {
  const isDevelopment = import.meta.env.DEV
  const url = isDevelopment ? `${import.meta.env.VITE_API_URL}/projects` : "production-url"
  const response = await fetch(url)
  return await response.json()
}

const HomePage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const projects = loaderData

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  )
}

export default HomePage
