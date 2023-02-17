import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { product, cart } from "../types/api"

interface CartContext {
  cart: cart[]
  addItemProduct(product: product): void
  removeItemProduct(product: product): void
  removeProduct(product: product): void
}

export const CartContext = createContext<CartContext>({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<cart[]>([])

  function addItemProduct(product: product) {
    if (cart.length === 0) return setCart([{product, quantity: 1}])

    let hasProduct = false
    const newCart = []

    for (const item of cart) {
      if (item.product.id === product.id) {
        item.quantity++

        hasProduct = true
      }

      newCart.push(item)
    }

    console.log(hasProduct)

    if (!hasProduct) setCart([...newCart, {product, quantity: 1}])
    else setCart([...newCart])
  }

  function removeItemProduct(product: product) {
    if (cart.length === 0) return

    const newCart = []

    for (const item of cart) {
      if (item.product.id === product.id) {
        item.quantity--
      }

      if (item.quantity === 0 ) removeProduct(product)
      else newCart.push(item)
    }

    setCart([...newCart])
  }

  function removeProduct(product: product) {
    setCart([...cart.filter((item) => item.product.id !== product.id)])
  }

  const value = useMemo(
    () => ({
      cart,
      addItemProduct,
      removeItemProduct,
      removeProduct
    }),
    [cart]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)