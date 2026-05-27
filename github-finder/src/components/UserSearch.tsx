import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { FaGithubAlt } from "react-icons/fa"

const UserSearch = () => {
  // TODO: Check if 'username' it need to be in the state or a useRef would be enough
  const [username, setUsername] = useState("")

  const [submittedUsername, setSubmittedUsername] = useState("")

  const { isLoading, isError, isFetched, error, data: user } = useQuery({
    queryKey: ['users', submittedUsername],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${submittedUsername}`)
      if (!response.ok) {
        console.log("Response not ok when fetching user")
        return null
      }
      const data = await response.json()
      return data
    },
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
        <div className="user-card">
          <img src={user.avatar_url} alt={user.name} className="avatar" />
          <h2>{user.name || user.login}</h2>
          <p className="bio">{user.bio}</p>
          <a className="profile-btn" href={user.html_url} target="_blank" rel="noopener noreferrer">
            <FaGithubAlt /> View Github Profile
          </a>
        </div>
      )}
    </>
  )
}

export default UserSearch
