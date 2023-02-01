import { createContext, ReactNode, useContext, useMemo, useState } from "react"

interface AuthContext {
  user: string | null,
  login(): string,
  logout(): void
}

export const AuthContext = createContext<AuthContext | null>(null)

export default function AuthProvider({ children }: { children: ReactNode}) {
  const [user, setUser] = useState<string>('')

  function login() {
    setUser('joaquim')

    return user
  }

  function logout() {
    setUser('')
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