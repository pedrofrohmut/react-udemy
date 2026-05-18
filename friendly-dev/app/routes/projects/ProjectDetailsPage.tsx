import type { Route } from "./+types/ProjectDetailsPage"
import type { Project } from "../../types"

import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router"
import { formatDate } from "../../utils"

export const clientLoader = async ({ params }: Route.ClientLoaderArgs): Promise<Project> => {
  const isDevelopment = import.meta.env.DEV
  const url = isDevelopment ? `http://localhost:5000/projects/${params.id}` : "production-url"
  const response = await fetch(url)
  if (!response.ok) {
    throw new Response("Project not found", { status: 404 })
  }
  const project: Project = await response.json()
  return project
}

export const HydrateFallback = () => <div>Loading...</div>

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData

  return (
    <>
      <Link to="/projects" className="flex items-center gap-2 text-blue-500 hover:text-blue-300 mb-6 transition">
        <FaArrowLeft /> Go Back
      </Link>

      <div className="grid gap-8 items-start md:grid-cols-2">
        <div>
          <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-4">{project.title}</h1>
          <p className="text-gray-300 text-sm mb-4">
            {formatDate(project.date)} + {project.category}
          </p>
          <p className="text-gray-200 mb-6">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition"
          >
            View Live Site
          </a>
        </div>
      </div>
    </>
  )
}

export default ProjectDetailsPage
