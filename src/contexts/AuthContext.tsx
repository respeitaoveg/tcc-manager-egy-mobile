import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

interface AuthContext {
  user: string | null,
  login: () => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContext | null>(null)

export default function AuthProvider({ children }: { children: ReactNode}) {
  const [user, setUser] = useState<string | null>(null)
  // const navigate = useNavigate()

  function login() {
    console.log(333)
    setUser('teste')
    // navigate('/teste')
  }

  function logout() {
    setUser(null)
    // navigate('/', { replace: true })
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