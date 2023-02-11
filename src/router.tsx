import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CreateCustomer from './pages/customer/create'
import Home from './pages/home'
import Login from './pages/login'
import ResumeCart from './pages/resume-cart'

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
      },
      {
        path: '/resume-cart',
        element: <ResumeCart />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])

export default router






