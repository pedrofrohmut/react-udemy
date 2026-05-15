import { Link } from "react-router"
import type { Project } from "../types"

type Props = {
  project: Project
}

const ProjectCard = ({ project }: Props) => {
  const { id, title, image, description, category, date } = project
  return (
    <Link to={`/projects/${id}`} className="block transform transition duration-300 hover:scale-[1.02]">
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md">
        <img alt={title} src={image} className="w-full h-40 object-cover" />
        <div className="p-5">
          <h3 className="text-3xl font-semibold text-blue-400 mb-1">{title}</h3>

          <p className="text-sm text-gray-300 mb-2">{description}</p>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{category}</span>
            <span>{new Date(date).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
