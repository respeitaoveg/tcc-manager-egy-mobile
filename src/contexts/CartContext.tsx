import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { product } from "../types/api"

interface CartContext {
  products: product[] | undefined
  addProduct(product: product): void
  removeProduct(product: product): void
}

export const CartContext = createContext<CartContext |  undefined>(undefined)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<product[]>()

  function addProduct(product: product) {
    setProducts([product])
  }

  function removeProduct(product: product) {
    setProducts([product])
  }

  const value = useMemo(
    () => ({
      products,
      addProduct,
      removeProduct
    }),
    [products]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)