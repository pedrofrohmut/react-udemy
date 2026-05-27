import { useState, useRef } from "react"
import { useQuery } from "@tanstack/react-query"

import { fetchGithubUser } from "../api/github"
import UserCard from "./UserCard"
import RecentUsers from "./RecentUsers"

const UserSearch = () => {
  const [query, setQuery] = useState<string>("")
  const [recentUsers, setRecentUsers] = useState<Array<string>>([])

  const queryRef = useRef<HTMLInputElement>(null)

  const { isLoading, isError, isFetched, error, data } = useQuery({
    queryKey: ['users', query],
    queryFn: () => fetchGithubUser(query),
      enabled: query !== "" // Prevents fetching for empty queries and on component mount
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (!queryRef.current) {
      console.error("Invalid ref for query input")
      return
    }

    const trimmedQuery = queryRef.current.value.trim()
    if (!trimmedQuery) return

      setQuery(trimmedQuery)

      setRecentUsers(prev => {
        const isPresent = prev.find(x => x === trimmedQuery)
        if (isPresent) return prev
          return prev.concat(trimmedQuery)
      })
  }

  const handleSelectRecent = (username: string) => {
    setQuery(username)
    if (queryRef?.current) {
      queryRef.current.value = username
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Enter github Username..." ref={queryRef} />
        <button type="submit">Search</button>
      </form>

      {isLoading && <div className="status">Loading...</div>}

      {isError && <div className="status error">{error.message}</div>}

      {isFetched && !data && <p>User not found.</p>}

      {isFetched && data && <UserCard user={data} />}

      <RecentUsers recentUsers={recentUsers} handleSelectRecent={handleSelectRecent} />
    </>
  )
}

export default UserSearch
