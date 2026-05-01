import { useState, useEffect } from "react"

const FIVE_MINUTES = 5 * 60 * 1000

const shouldFetchPosts = (lastFetch) => {
  if (!lastFetch) return true
  const timeSinceLastFetch = Date.now() - new Date(lastFetch).getTime()
  return timeSinceLastFetch > FIVE_MINUTES
}

const Coins = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedPosts = localStorage.getItem("posts")
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts).slice(0, 5))
      console.log("Posts loaded from localStorage")
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await response.json()
        setPosts(data.slice(0, 5))
        localStorage.setItem("posts", JSON.stringify(data.slice(0, 5)))
        localStorage.setItem("postsLastFetch", new Date().toISOString())
        console.log("Posts loaded from fetch")
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const lastFetch = localStorage.getItem("postsLastFetch")
    if (shouldFetchPosts(lastFetch)) {
      fetchPosts()
    } else {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) return <p>Fetching posts...</p>

  return <pre>{JSON.stringify(posts, null, 4)}</pre>
}

export default Coins
