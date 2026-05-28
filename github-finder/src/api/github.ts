// https://docs.github.com/en/rest/users/users?apiVersion=2026-03-10#get-a-user
export const fetchGithubUser = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`)

  if (!response.ok) {
    throw new Error("User not found")
  }

  const data = await response.json()
  return data
}

// https://docs.github.com/en/rest/search/search?apiVersion=2026-03-10#search-users
export const searchGithubUser = async (query: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}&page=1&per_page=5`)

  if (!response.ok) {
    throw new Error("User not found")
  }

  const data = await response.json()
  return data
}

// https://docs.github.com/en/rest/users/followers?apiVersion=2026-03-10#check-if-a-person-is-followed-by-the-authenticated-user
export const checkIfFollowingUser = async (username: string) => {
  const FOLLOWING_CODE = 204
  const NOT_FOLLOWING_CODE = 404

  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
      Accept: "application/vnd.github+json",
    }
  })

  if (!response.ok) {
    throw new Error("Error to check if following user")
  }

  if (response.status === FOLLOWING_CODE) {
    return true
  }

  if (response.status === NOT_FOLLOWING_CODE) {
    return false
  }

  throw new Error("Error to check if following user")
}
