import type { Project } from "../../types"
import type { Route } from "./+types/ProjectsPage"
import ProjectCard from "../../components/ProjectCard"
import { useState } from "react"
import Pagination from "../../components/Pagination"
import { AnimatePresence, motion } from "framer-motion"

type LoaderData = {
  projects: Array<Project> | null
  error: Error | null
}

export const loader = async ({}: Route.LoaderArgs): Promise<LoaderData> => {
  // Populate param is to get image info
  const url = `${import.meta.env.VITE_API_URL}/projects?populate=*`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error("Fetch response not ok")
    }

    const projects = await response.json()

    const uiProjects = projects.data.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      image: `${import.meta.env.VITE_STRAPI_URL}${p.image.url}`,
      url: p.url,
      date: p.date,
      category: p.category,
      featured: p.isFeatured,
    }))

    return {
      error: null,
      projects: uiProjects,
    }
  } catch (err: any) {
    const fetchErr = new Error(`Error to fetch projects from API: ${err.message || ""}`)
    fetchErr.stack = err.stack || ""

    return {
      projects: null,
      error: fetchErr
    }
  }
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { projects, error } = loaderData

  let categories: Array<string> = []
  let currentProjects: Array<Project> = []
  let totalPages = 0

  if (!error && projects != null) {
    // Extract unique categories from projects + "All"
    categories = ["All", ...new Set(projects.map((project) => project.category))]

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
    currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast)
  }

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (n: number) => setCurrentPage(n)

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">🧾 Projects</h2>

      {error && <div className="">🚫 {error.message}</div>}

      {!error && (
        <>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.length > 0 &&
              categories.map((category: string) => (
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
        </>
      )}

      <Pagination numberOfPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </>
  )
}

export default ProjectsPage
