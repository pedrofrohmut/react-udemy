import type { Project } from "~/types"
import type { Route } from "./+types/Index"

type ProjectsData = { projects: Array<Project> }

export const loader = async ({ request }: Route.LoaderArgs): Promise<ProjectsData> => {
  const response = await fetch("http://localhost:5000/projects")
  const data = await response.json()
  return { projects: data }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as ProjectsData

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
    </>
  )
}

export default ProjectsPage
