import { useEffect } from "react"
import { createContext, useState, useContext } from "react"
import type { ReactNode } from "react"
import { toast } from "sonner"

import { refreshAccessToken } from "@/api/auth-api"
import { setStoreAccessToken } from "@/lib/axios"

export type AuthUser = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  accessToken: Optional<string>
  setAccessToken: (token: Optional<string>) => void
  user: Optional<AuthUser>
  setUser: (user: Optional<AuthUser>) => void
}

const AuthContext = createContext<Optional<AuthContextType>>(null)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<Optional<string>>(null)
  const [user, setUser] = useState<Optional<AuthUser>>(null)

  const refreshUserSession = async () => {
    try {
      const signedUser = await refreshAccessToken()
      if (!signedUser) {
        return
      }

      const { userId: id, name, email, accessToken } = signedUser
      setUser({ id, name, email })
      setAccessToken(accessToken)
      setStoreAccessToken(accessToken)
    } catch (err) {
      toast.error("Could not refresh the user session")
    }
  }

  useEffect(() => {
    refreshUserSession()
  }, [])

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within a provider")
  }

  return context
}

export { AuthProvider, useAuth }
