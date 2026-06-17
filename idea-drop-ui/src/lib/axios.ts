import axios from "axios"
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios"

import { refreshAccessToken } from "@/api/auth-api"

class TokenHolder {
  private accessToken: Optional<string> = null

  set(token: Optional<string>) {
    this.accessToken = token
  }

  get() {
    return this.accessToken
  }
}

const holder = new TokenHolder()
export const setStoreAccessToken = (token: Optional<string>) => holder.set(token)
export const getStoreAccessToken = () => holder.get()

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // default false
  headers: {
    "Content-Type": "application/json",
  }
})

// Axios intercept the request to add auth header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getStoreAccessToken()
    if (token && token.trim() !== "") {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: any) => {
    console.log("Axios request interceptor: ", error)
    return Promise.reject(error)
  }
)

// Axios intercept the response to refresh the accessToken
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: any) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/users/refresh")
    ) {
      originalRequest._retry = true

      try {
        const signedUser = await refreshAccessToken()
        if (!signedUser) {
          console.error("Error get a refresh token")
          return Promise.reject(error)
        }
        const newToken = signedUser.accessToken
        setStoreAccessToken(newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        console.log("[INFO] Access token have been refreshed.")
        return api(originalRequest)
      } catch (err: any) {
        console.error("[ERROR] Refresh token failed.", err)
      }
    }

    return Promise.reject(error)
  }
)

export default api
