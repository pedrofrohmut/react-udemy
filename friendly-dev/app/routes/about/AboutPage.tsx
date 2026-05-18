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

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-2">About Me</h2>
      <p className="text-1xl text-white mb-2">Hey I am Pedro Frohmut</p>
    </>
  )
}

export default AboutPage
