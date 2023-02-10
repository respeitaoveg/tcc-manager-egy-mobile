import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CreateCustomer from './pages/customer/create'
import Home from './pages/home'
import Login from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/customer',
        children: [
          {
            path: '/customer/create',
            element: <CreateCustomer />
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])

export default router






