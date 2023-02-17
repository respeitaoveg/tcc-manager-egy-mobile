import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ListProducts from '../components/ListProducts'
import SearchProduct from '../components/SearchProduct'
import { ClientApi } from '../services/ClientApi'
import { product } from '../types/api'
import productsJson from '../../products'

export default function Home() {
  const api = new ClientApi()
  const [products, setProducts] = useState<product[] | undefined>()

  useEffect(() => {
    getProducts('trena')
  }, [])

  async function getProducts(search: string) {
    try {
      // const data = await api.products({ nome: search })

      if (productsJson) setProducts(productsJson.products)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <VStack alignItems="stretch" spacing={4} maxWidth="100%" height="100vh">
      <SearchProduct getProducts={getProducts} />
      <ListProducts products={products} />
    </VStack>
  )
}
