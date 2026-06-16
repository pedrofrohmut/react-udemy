import axios from "axios"

const api = (accessToken?: Optional<string>) => {
  const authorizationHeader = accessToken ? `Bearer ${accessToken}` : ""

  return axios.create({
    baseURL: "/api",
    // withCredentials: true,
    withCredentials: false, // default
    headers: {
      "Content-Type": "application/json",
      "Authorization": authorizationHeader,
    },
  })
}

export default api
