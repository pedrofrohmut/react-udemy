import type { Route } from "./+types/ProjectDetailsPage"
import type { Project } from "../../types"

export const clientLoader = async ({ request, params }: Route.ClientLoaderArgs): Promise<Project> => {
  const response = await fetch(`http://localhost:5000/projects/${params.id}`)
  if (!response.ok) {
    throw new Response("Project not found", { status: 404 })
  }
  const project: Project = await response.json()
  return project
}

export const HydrateFallback = () => <div>Loading...</div>

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      Project Details Page
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </>
  )
}

export default ProjectDetailsPage
