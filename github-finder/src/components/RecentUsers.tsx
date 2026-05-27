import { FaClock, FaUser } from "react-icons/fa"
import { useQueryClient } from "@tanstack/react-query"

import { fetchGithubUser } from "../api/github"

type RecentUsersProps = {
  recentUsers: Array<string>
  handleSelectRecent: (query: string) => void
}

const RecentUsers: React.FC<RecentUsersProps> = ({ recentUsers, handleSelectRecent }) => {
  if (!recentUsers || recentUsers.length === 0) {
    return null
  }

  const queryClient = useQueryClient()

  return (
    <div className="recent-searches">
      <div className="recent-header">
        <FaClock />
        <h3>Recent Searches</h3>
        <ul>
          {recentUsers.map((user: string) => (
            <li key={user}>
              <button
                onClick={() => handleSelectRecent(user)}
                onMouseEnter={() => {
                  queryClient.prefetchQuery({
                    queryKey: ["users", user],
                    queryFn: () => fetchGithubUser(user),
                  })
                }}
              >
                <FaUser className="user-icon" /> {user}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RecentUsers
