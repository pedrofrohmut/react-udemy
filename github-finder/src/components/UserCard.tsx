import { useQuery, useMutation } from "@tanstack/react-query"
import { FaGithubAlt, FaUserMinus, FaUserPlus } from "react-icons/fa"
import { toast } from "sonner"

import type { GithubUser } from "../types"
import { checkIfFollowingUser, followGithubUser, unfollowGithubUser } from "../api/github"

type UserCardProps = {
  user: GithubUser
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user) {
    return null
  }

  // Query: check-if-a-person-is-followed-by-the-authenticated-user
  const { data: isFollowing, refetch: refetchFollowStatus } = useQuery({
    queryKey: ["follow-status", user.login],
    queryFn: () => checkIfFollowingUser(user.login),
    enabled: user.login !== ""
  })

  // Mutation: follow-a-user
  const followMutation = useMutation({
    mutationFn: () => followGithubUser(user.login),
    onSuccess: () => {
      toast.success(`You are now following ${user.login}`)
      refetchFollowStatus()
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  // Mutation: unfollow-a-user
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowGithubUser(user.login),
    onSuccess: () => {
      toast.success(`You are no longer following ${user.login}`)
      refetchFollowStatus()
    },
    onError: (err) => {
      toast.error(err.message)
    }
  })

  const handleFollowStatus = () => {
    if (isFollowing) {
      unfollowMutation.mutate()
    } else {
      followMutation.mutate()
    }
  }

  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>

      <div className="user-card-buttons">
        <button
          className={`follow-btn ${isFollowing ? "following" : ""}`}
          onClick={handleFollowStatus}
          disabled={followMutation.isPending || unfollowMutation.isPending}
        >
          {isFollowing ? (
            <>
              <FaUserMinus className="follow-icon" /> Following
            </>
          ) : (
            <>
              <FaUserPlus className="follow-icon" /> Follow user
            </>
          )}
        </button>

        <a className="profile-btn" href={user.html_url} target="_blank" rel="noopener noreferrer">
          <FaGithubAlt /> View Github Profile
        </a>
      </div>
    </div>
  )
}

export default UserCard
