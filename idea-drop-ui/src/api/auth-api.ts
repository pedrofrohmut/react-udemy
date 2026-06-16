import api from "@/lib/axios"

import type { CreateUser, SignInCredentials } from "@/types"

export const signUpUser = async (newUser: CreateUser): Promise<void> => {
  try {
    await api.post("/users/signup", newUser)
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to sign up"
    throw new Error(message)
  }
}

export const signInUser = async (credentials: SignInCredentials) => {
  try {
    const response = await api.post("/users/signin", credentials)
    const signedUser = await response.data
    return signedUser
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to sign in"
    throw new Error(message)
  }
}
