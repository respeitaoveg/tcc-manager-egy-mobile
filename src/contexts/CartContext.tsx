import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { product } from "../types/api"

interface CartContext {
  products: product[] | null
  addProduct(product: product): void
  removeProduct(product: product): void
}

export const CartContext = createContext<CartContext>({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<product[]>([])

  function addProduct(product: product) {
    setProducts([...products, product])

    console.log(111, products)
  }

  function removeProduct(product: product) {
    setProducts([...products.filter((p) => p.id !== product.id)])
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