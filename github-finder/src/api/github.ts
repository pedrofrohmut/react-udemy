export const fetchGithubUser = async (username: string) => {
  const response = await fetch(`${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`)
  if (!response.ok) {
    // console.log("Response not ok when fetching user")
    // return null
    throw new Error("User not found")
  }
  const data = await response.json()
  return data
}
