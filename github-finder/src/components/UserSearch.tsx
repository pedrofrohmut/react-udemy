import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { fetchGithubUser } from "../api/github"
import UserCard from "./UserCard"

const UserSearch = () => {
  // TODO: Check if 'username' it need to be in the state or a useRef would be enough
  const [username, setUsername] = useState("")

  const [submittedUsername, setSubmittedUsername] = useState("")

  const { isLoading, isError, isFetched, error, data: user } = useQuery({
    queryKey: ['users', submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: submittedUsername !== "" // Prevents fetching for empty strings
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSubmittedUsername(username.trim())
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter github Username..."
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <div className="status">Loading...</div>}

      {isError && <div className="status error">{error.message}</div>}

      {isFetched && !user && <p>User not found.</p>}

      {isFetched && user && (
        <UserCard user={user} />
      )}
    </>
  )
}

export default UserSearch
