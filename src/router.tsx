import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/auth/ProtectedRoute'
import CreateCustomer from './pages/customer/create'
import Home from './pages/home'
import Login from './pages/login'
import ResumeCart from './pages/resume-cart'
import Sale from './pages/Sale'

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
      },
      {
        path: '/sale/:id',
        element: <Sale />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
])

export default router






