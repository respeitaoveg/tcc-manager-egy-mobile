import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { ClientApi } from "../services/ClientApi"
import { user } from "../types/api"

interface AuthContext {
  user: user | undefined,
  login(login: string, password: string): void,
  logout(): void
}

export const AuthContext = createContext<AuthContext | undefined>(undefined)

export default function AuthProvider({ children }: { children: ReactNode}) {
  const [user, setUser] = useState<user>()

  const api = new ClientApi()

  async function login(login: string, password: string) {
    const user = await api.login(login, password)

    if (user) setUser(user)
  }

  function logout() {
    setUser(undefined)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)