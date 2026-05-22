import { Link } from "react-router"

import type { Project } from "../types"
import { formatDate } from "../utils"

type ProjectCardProps = {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, image, description, category, date } = project
  return (
    <Link to={`/projects/${id}`} className="block">
      <div
        className="bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden
        shadow-sm transition hover:shadow-md hover:border-gray-200 transition-border
        ease-in duration-500"
      >
        {image && <img alt={title} src={image} className="w-full h-40 object-cover" />}

        <div className="p-5">
          <h3 className="text-3xl font-semibold text-blue-400 mb-1">{title}</h3>

          <p className="text-sm text-gray-300 mb-2">{description}</p>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{category}</span>
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
