import axios from "axios"

let accessToken: Optional<string> = null

export const setStoreAccessToken = (token: Optional<string>) => {
  accessToken = token
}

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // default false
  headers: {
    "Content-Type": "application/json",
    "Authorization": accessToken !== null ? `Bearer ${accessToken}` : "",
  }
})

export default api
