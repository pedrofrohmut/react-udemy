import api from "@/lib/axios"

import type { CreateUser } from "@/types"

export const signUp = async (newUser: CreateUser) => {
  // const { name, email, password } = newUser
  try {
    await api.post("/users/signup", newUser)
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to sign up"
    throw new Error(message)
  }
}
