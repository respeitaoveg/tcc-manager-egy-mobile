import { createStandaloneToast } from "@chakra-ui/react"
import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { ClientApi } from "../services/ClientApi"
import { product, cart } from "../types/api"
import parseMainName from "../utils/parseMainName"

const { toast } = createStandaloneToast()

interface CartContext {
  products: product[]
  cart: cart[]
  addItemProduct(product: product): void
  removeItemProduct(product: product): void
  removeProduct(product: product, hasMessage?: boolean): void
  clearCart(hasMessage?: boolean): void
  getProducts(search: string): void
}

export const CartContext = createContext<CartContext>({} as CartContext)

export default function CartProvider({ children }: { children: ReactNode }) {
  const api = new ClientApi()

  const [cart, setCart] = useState<cart[]>([])
  const [products, setProducts] = useState<product[]>([])

  async function getProducts(search: string) {
    try {
      const data = await api.products({ nome: search })

      if (data) setProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  function addItemProduct(product: product) {
    if (!product.estoqueAtual || product.estoqueAtual === 0) {
      return toast({
        title: 'Erro!',
        description: 'Produto sem estoque',
        status: 'error',
        duration: 2000
      })
    }

    const addMessage = () => toast({
      title: 'Adicionado!',
      description: `Item ${parseMainName(product.nome)} adicionado(a) com sucesso!`,
      status: 'success',
      duration: 2000
    })

    if (cart.length === 0) {
      setCart([{product, quantity: 1}])

      return addMessage()
    }

    let hasProduct = false
    const newCart = []

    for (const item of cart) {
      if (item.product.id === product.id) {
        if (item.product.estoqueAtual === item.quantity)
          return toast({
            title: 'Erro!',
            description: 'Limite de estoque alcançado',
            status: 'error',
            duration: 2000
          })

        item.quantity++

        hasProduct = true
      }

      newCart.push(item)
    }

    if (!hasProduct) setCart([...newCart, {product, quantity: 1}])
    else setCart([...newCart])

    addMessage()
  }

  function removeItemProduct(product: product) {
    if (!product.estoqueAtual || product.estoqueAtual === 0) {
      return toast({
        title: 'Erro!',
        description: 'Produto sem estoque',
        status: 'error',
        duration: 2000
      })
    }

    const removeMessage = () => toast({
      title: 'Removido!',
      description: `Item ${product.nome} removido(a) com sucesso!`,
      status: 'success',
      duration: 2000
    })

    if (cart.length === 0) {
      return toast({
        title: 'Carrinho vazio!',
        description: `O carrinho está vazio.`,
        status: 'success',
        duration: 2000
      })
    }

    let hasProduct = false
    const newCart = []

    for (const item of cart) {
      if (item.product.id === product.id) {
        item.quantity--

        hasProduct = true
      }

      if (item.quantity === 0 ) removeProduct(product)
      else newCart.push(item)
    }

    if (!hasProduct) {
      return toast({
        title: 'Produto não encontrado!',
        description: `Não há este produto no carrinho`,
        status: 'success',
        duration: 2000
      })
    } else setCart([...newCart])

    removeMessage()
  }

  function removeProduct(product: product, hasMessage?: boolean) {
    setCart([...cart.filter((item) => item.product.id !== product.id)])

    if (hasMessage)
      toast({
        title: 'Produto removido!',
        description: `O produto foi removido do carrinho`,
        status: 'success',
        duration: 2000
      })
  }

  function clearCart(hasMessage?: boolean) {
    setCart([])

    if (hasMessage)
      toast({
        title: 'Carrinho limpo!',
        description: 'Carrinho limpo com sucesso.',
        status: 'success',
        duration: 2000
      })
  }

  const value = useMemo(
    () => ({
      cart,
      addItemProduct,
      removeItemProduct,
      removeProduct,
      clearCart,
      getProducts,
      products
    }),
    [cart, products]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)