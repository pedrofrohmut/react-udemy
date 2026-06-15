import { createContext, useState, useContext } from "react"
import type { ReactNode } from "react"

type AuthUser = {
  id: string
  name: string
  email: string
}

type AuthContext = {
  accessToken: string | null
  setAccessToken: (token: string) => void
  user: AuthUser | null
  setUser: (user: AuthUser) => void
}

const AuthContext = createContext<AuthContext | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)

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
