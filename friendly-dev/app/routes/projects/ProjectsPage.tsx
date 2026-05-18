import type { Project } from "../../types"
import type { Route } from "./+types/ProjectsPage"
import ProjectCard from "../../components/ProjectCard"
import { useState } from "react"
import Pagination from "../../components/Pagination"

type ProjectsData = { projects: Array<Project> }

export const loader = async ({}: Route.LoaderArgs): Promise<ProjectsData> => {
  const response = await fetch("http://localhost:5000/projects")
  const data = await response.json()
  return { projects: data }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as ProjectsData

  const [currentPage, setCurrentPage] = useState<number>(1)

  const projectsPerPage = 10
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
      <Pagination numberOfPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </>
  )
}

export default ProjectsPage
