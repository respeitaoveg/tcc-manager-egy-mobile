import { VStack } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import ListProducts from '../components/ListProducts'
import SearchProduct from '../components/SearchProduct'
import { CartContext } from '../contexts/CartContext'

export default function Home() {
  const { products, getProducts } = useContext(CartContext)
  useEffect(() => {
    getProducts('')
  }, [])

  return (
    <VStack alignItems="stretch" spacing={4} maxWidth="100%" height="100vh">
      <SearchProduct getProducts={getProducts} />
      <ListProducts products={products} />
    </VStack>
  )
}
