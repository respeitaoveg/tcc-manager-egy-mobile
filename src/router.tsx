import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Login from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router






