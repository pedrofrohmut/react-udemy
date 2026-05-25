import type { Route } from "./+types/ProjectDetailsPage"
import type { Project, ApiProject } from "../../types"
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router"
import { formatDate, getImageUrlOrNone } from "../../utils"
import NotFoundPage from "../NotFoundPage"

export const loader = async ({ params }: Route.LoaderArgs): Promise<Project | null> => {
  const url = `${import.meta.env.VITE_API_URL}/projects/${params.id}?populate=*`

  const response = await fetch(url)
  if (!response.ok) {
    return null
  }
  const apiProject: ApiProject = (await response.json()).data

  const uiProject: Project = {
    id: apiProject.id,
    documentId: apiProject.documentId,
    title: apiProject.title,
    description: apiProject.description,
    image: getImageUrlOrNone(apiProject.image?.url),
    url: apiProject.url,
    date: apiProject.date,
    category: apiProject.category,
    isFeatured: apiProject.isFeatured,
  }

  return uiProject
}

const ProjectDetailsPage: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const project = loaderData

  if (!project) return <NotFoundPage />

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
