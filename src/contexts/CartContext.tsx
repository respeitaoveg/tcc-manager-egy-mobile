import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { product } from "../types/api"

interface Cart {
  product: product
  quantity: number
}

interface CartContext {
  cart: Cart[]
  addProduct(product: product): void
  removeProduct(product: product): void
}

export const CartContext = createContext<CartContext>({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart[]>([])

  function addProduct(product: product) {
    if (cart.length === 0) return setCart([{product, quantity: 1}])

    let hasProduct = false

    for (const item of cart) {
      if (item.product.id === product.id) {
        item.quantity++

        hasProduct = true
      }
    }

    if (!hasProduct) {
      setCart([...cart, {product, quantity: 1}])
    }
  }

  function removeProduct(product: product) {
    setCart([...cart.filter((p) => p.product.id !== product.id)])
  }

  const value = useMemo(
    () => ({
      cart,
      addProduct,
      removeProduct
    }),
    [cart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)