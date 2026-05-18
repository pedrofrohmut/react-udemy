import type { Project } from "../../types"
import type { Route } from "./+types/ProjectsPage"
import ProjectCard from "../../components/ProjectCard"
import { useState } from "react"

type ProjectsData = { projects: Array<Project> }

export const loader = async ({ request }: Route.LoaderArgs): Promise<ProjectsData> => {
  const response = await fetch("http://localhost:5000/projects")
  const data = await response.json()
  return { projects: data }
}

type PaginationProps = {
  numberOfPages: number
  currentPage: number
  handlePageChange: (n: number) => void
}

const Pagination = ({ numberOfPages, currentPage, handlePageChange }: PaginationProps) => {
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1)
  return (
    <div className="flex justify-center gap-2 mt-8">
      {pageNumbers.map((n) => (
        <button
          key={n}
          className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === n ? "bg-blue-700 text-white" : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => handlePageChange(n)}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as ProjectsData

  const [currentPage, setCurrentPage] = useState<number>(1)

  const projectsPerPage = 4
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const indexOfLast = currentPage * projectsPerPage
  const indexOfFirst = indexOfLast - projectsPerPage
  const currentProjects = projects.slice(indexOfFirst, indexOfLast)

  const handlePageChange = (n: number) => {
    setCurrentPage(n)
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination numberOfPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
      )}
    </>
  )
}

export default ProjectsPage
