import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from "react-router-dom"
import AuthProvider from './contexts/AuthContext'
import CartProvider from './contexts/CartContext'
import CustomerProvider from './contexts/CustomerContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <AuthProvider>
      <CartProvider>
        <CustomerProvider>
          <RouterProvider router={router} />
        </CustomerProvider>
      </CartProvider>
    </AuthProvider>
  </ChakraProvider>
)
