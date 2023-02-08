import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from "react-router-dom"
import AuthProvider from './contexts/AuthContext'
import CartProvider from './contexts/CartContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
)
