import { CheckIcon, Search2Icon } from '@chakra-ui/icons'
import { Button, Input, InputGroup, InputLeftElement, InputRightElement, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import Logged from '../components/layouts/Logged'
// import Logged from '../components/layouts/Logged'
// import CardProductResume from '../components/products/CardProductResume'

const products = [
  {
    name: 'Bicicleta',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image:
      'https://img2.gratispng.com/20180420/rwe/kisspng-track-bicycle-look-track-cycling-racing-track-5ada6bb91d8461.5829708015242638651209.jpg',
    price: 20000.00,
    quantity: 13
  },
  {
    name: 'Oculos',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    price: 250.00,
    quantity: 13
  },
  {
    name: 'Som',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    image:
      'https://cf.shopee.com.br/file/008fddcddd4241bbd63952d92ce79a26',
    price: 500.00,
    quantity: 11
  },
]

export default function Index() {
  const [filteredProducts, setFilteredProducts] = useState(products)

  function searchProducts(value?: string) {
    if (value) {
      const aux = filteredProducts.filter(item => {
        return Object.values(item).join('').toLowerCase().includes(value.toLowerCase())
      })

      return setFilteredProducts(aux)
    }


    return setFilteredProducts(products)
  }

  return (
    <Logged>
      <VStack
        alignItems='stretch'
        spacing={4}
        maxWidth='100%'
        height='100vh'
      >
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Produto' onChange={e => searchProducts(e.target.value)} />
          <InputRightElement mr={2}>
            <Button colorScheme='teal' h='1.75rem' size='sm' onClick={() => ({})}>
              <CheckIcon color='white' />
            </Button>
          </InputRightElement>
        </InputGroup>

        {/* {filteredProducts.map((product, index) => {
          return (
            <CardProductResume
              key={index}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
            />
          )
        })} */}
      </VStack>
    </Logged>
  )
}
