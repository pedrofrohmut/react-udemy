import { FaGithubAlt } from "react-icons/fa"
import type { GithubUser } from "../types"

type UserCardProps = {
  user: GithubUser
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>
      <a className="profile-btn" href={user.html_url} target="_blank" rel="noopener noreferrer">
        <FaGithubAlt /> View Github Profile
      </a>
    </div>
  )
}

export default UserCard
