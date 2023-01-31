import { createContext, ReactNode, useState } from "react"

type AuthContext = {
  user: string | null,
  login: () => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContext | null>(null)

export default function AuthProvider({ children }: { children: ReactNode}) {
  const [user, setUser] = useState('')

  function login() {
    setUser('teste')
  }

  function logout() {
    setUser('')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}