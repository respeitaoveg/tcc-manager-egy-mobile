import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { user } from "../../types/api"

export default function ProtectedRoute({ children }: { children: ReactNode}) {
  const auth = useAuth()

  const auxAuth = localStorage.getItem('auth')

  if (auxAuth) {
    const parsedAuth: user = JSON.parse(auxAuth)

    if (parsedAuth.token) return <>{children}</>
  }

  if (!auth?.user) return <Navigate to='/login' />
}