import type { Project } from "../../types"
import type { Route } from "./+types/ProjectsPage"
import ProjectCard from "../../components/ProjectCard"
import { useState } from "react"
import Pagination from "../../components/Pagination"
import { AnimatePresence, motion } from "framer-motion"

export const loader = async ({}: Route.LoaderArgs): Promise<Array<Project>> => {
  const isDevelopment = import.meta.env.DEV
  const url = isDevelopment ? `${import.meta.env.VITE_API_URL}/projects` : "production-url"
  const response = await fetch(url)
  return await response.json()
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const projects = loaderData

  // Extract unique categories from projects + "All"
  const categories: Array<string> = ["All", ...new Set(projects.map((project) => project.category))]

  // Apply filters
  let filteredProjects: Array<Project> = []
  if (selectedCategory === "All") {
    filteredProjects = projects
  } else {
    filteredProjects = projects.filter((project) => project.category === selectedCategory)
  }

  // Paginate filtered projects
  const projectsPerPage = 10
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const indexOfLast = currentPage * projectsPerPage
  const indexOfFirst = indexOfLast - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast)

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (n: number) => setCurrentPage(n)

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">Projects</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.length > 0 &&
          categories.map((category) => (
            <button
              onClick={() => handleChangeCategory(category)}
              className={`px-3 py-1 rounded text-sm cursor-pointer ${
                selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project: Project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination numberOfPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </>
  )
}

export default ProjectsPage
