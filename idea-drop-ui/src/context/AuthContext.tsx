import { createContext, useState, useContext } from "react"
import type { ReactNode } from "react"

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
