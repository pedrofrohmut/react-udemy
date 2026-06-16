import api from "@/lib/axios"

import type { CreateUser, SignInCredentials, SignedUser } from "@/types"

export const signUpUser = async (newUser: CreateUser): Promise<void> => {
  try {
    await api().post("/users/signup", newUser)
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to sign up"
    throw new Error(message)
  }
}

export const signInUser = async (credentials: SignInCredentials): Promise<SignedUser> => {
  try {
    const response = await api().post("/users/signin", credentials)
    const signedUser = await response.data
    return signedUser
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to sign in"
    throw new Error(message)
  }
}

export const signOutUser = async (): Promise<void> => {
  try {
    await api().post("/users/signout")
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to sign out"
    throw new Error(message)
  }
}

export const refreshAccessToken = async (): Promise<Optional<SignedUser>> => {
  try {
    const response = await api().post("/users/refresh")
    const signedUser = await response.data
    return signedUser
  } catch (err: any) {
    if (err.status && err.status === 401) {
      return null
    }
    const message = err.response?.data?.message || "Failed to refresh session"
    throw new Error(message)
  }
}
