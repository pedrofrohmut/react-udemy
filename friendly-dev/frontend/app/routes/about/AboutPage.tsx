import { useEffect } from "react"

const AboutPage = () => {
  const date = new Date()
  date.setHours(date.getHours() - 3) // To fix the time zone that goes weird when you use toISOString
  const now = date.toISOString()

  // To check out the part that happens in the client (hydration) vs the part
  // that happens in the server (server rendering)
  if (typeof window === "undefined") {
    console.log("Server rendered at:", now)
  } else {
    console.log("Client hydration at:", now)
  }

  useEffect(() => {
    if (window) {
      // In react router framework you dont need the if window
      console.log("ScrollX: ", window.scrollX)
    }
  }, [])

  const technologies = [
    "React",
    "NextJS",
    "Vue",
    "TailwindCSS",
    "Node.js",
    "Laravel",
    "Prisma",
    "MongoDB",
    "PostgreSQL",
    "Appwrite",
    "Docker"
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900">
      {/* Intro */}
      <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
        <img
          alt="profile"
          src="/images/profile.jpg"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Hi, I am John Doe 👋</h1>
          <p className="text-gray-300 text-lg">
            I'm a passionate web developer and content creator who loves building friendly digital experiences and
            helping others grow into confident, modern developers.
          </p>
        </div>
      </div>

      {/* Bio */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">My Mission</h2>
        <p className="text-gray-300 leading-relaxing">
          After turning my life around, I made it my mission to share what I’ve learned with others — not just about
          code, but about building a life you’re proud of. Through tutorials, courses, and real-world projects, I aim to
          make development accessible, friendly, and something you look forward to each day.
        </p>
      </section>

      {/* Tach Stack */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-white">🚀 Tech I Use</h2>
        <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
          {technologies.map((tech: string) => (
            <li key={tech} className="bg-gray-700 px-3 py-1 rounded-md">
              {tech}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default AboutPage
