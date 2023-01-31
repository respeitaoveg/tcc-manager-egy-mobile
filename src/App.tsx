import AuthProvider from "./contexts/AuthContext"
import useAuth from "./hooks/useAuth"

export default function App() {
  const teste = useAuth()
  console.log(teste)

  return (
    <AuthProvider>
      <div>teste</div>
    </AuthProvider>
  )
}