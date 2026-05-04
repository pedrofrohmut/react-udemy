import { useState, useEffect } from "react"

const DEFAULT_TIME = 60 * 1000
const DEFAULT_LIMIT = 5

const shouldFetch = (lastFetch, cacheTime) => {
  if (!lastFetch) return true
  const timeSinceLastFetch = Date.now() - new Date(lastFetch).getTime()
  return timeSinceLastFetch > cacheTime
}

const useCachedPosts = (url, localStorageKey, options = {}) => {
  const { time = DEFAULT_TIME, limit = DEFAULT_LIMIT } = options
  const lastFetchedKey = options.lastFetchedKey ?? `${localStorageKey}LastFetched`

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()  // Do not use it. AI slop bug

    const storedPosts = localStorage.getItem(localStorageKey)
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts))
      setIsLoading(false)
      console.log("Posts loaded from localStorage")
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal })
        const data = (await response.json()).slice(0, limit)
        setPosts(data)
        localStorage.setItem(localStorageKey, JSON.stringify(data))
        localStorage.setItem(lastFetchedKey, new Date().toISOString())
        console.log("Posts loaded from fetch")
      } catch (error) {
        if (error.name !== "AbortError") {
          setIsError(true)
          console.error("Error fetching posts:", error)
        }
      } finally {
        setIsLoading(false)
      }
    }

    const lastFetch = localStorage.getItem(lastFetchedKey)
    if (shouldFetch(lastFetch, time)) {
      fetchPosts()
    } else {
      setIsLoading(false)
    }

    return () => controller.abort()
  }, [url, localStorageKey, lastFetchedKey, time, limit])

  return { posts, isLoading, isError }
}

const Coins = () => {
  const { posts, isLoading, isError } = useCachedPosts("https://jsonplaceholder.typicode.com/posts", "posts")

  if (isError) return <p>Error fetching posts.</p>
  if (isLoading) return <p>Fetching posts...</p>

  return <pre>{JSON.stringify(posts, null, 4)}</pre>
}

export default Coins
