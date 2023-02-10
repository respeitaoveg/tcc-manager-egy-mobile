import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Logged from './components/layouts/Logged'
import CreateCustomer from './pages/customer/create'
import Login from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/customer',
    children: [
      {
        path: '/customer/create',
        element: (
          <ProtectedRoute>
            <Logged>
              <CreateCustomer />
            </Logged>
          </ProtectedRoute>
        )
      }
    ]
  }
])

export default router






