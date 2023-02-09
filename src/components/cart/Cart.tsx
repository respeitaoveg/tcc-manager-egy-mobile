import { Button, Divider, HStack, Input, InputGroup, InputRightElement, Text, useToast, VStack } from '@chakra-ui/react'
import ProductCart from './ProductCart'
import { ChangeEvent, useState } from 'react'
import { Search2Icon } from '@chakra-ui/icons'
import { useCart } from '../../contexts/CartContext'
import { cart, product } from '../../types/api'

interface CartProps {
  onToggleSidepaneDrawer(): void
}

export default function Cart({ onToggleSidepaneDrawer }: CartProps) {
  const toast = useToast()
  const { cart, removeProduct } = useCart()

  const [customerInput, setCustomerInput] = useState('')

  function handleChangeId(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
    setCustomerInput(e.target.value)
  }

  const onSearchCustomer = () => {

    // if (id === '023.426.236-34') {
    //   toast({
    //     title: 'Encontrado!',
    //     description: 'Cliente encontrado com sucesso',
    //     status: 'success',
    //     duration: 2000
    //   })

    //   // setFindedCustomer(true)
    //   // setcreateCustomer(false)
    //   // setFindedUser.toggle()

    //   return
    // }

    toast({
      title: 'Não encontrado!',
      description: 'Cliente não encontrado.',
      status: 'error',
      duration: 2000
    })

    // setFindedCustomer(false)
    // setcreateCustomer(true)
  }

  const onCreateCustomer = () => {
    // setFindedCustomer(false)
    // setcreateCustomer(true)
    // Router.push('/customer')
    onToggleSidepaneDrawer()
  }

  return (
    <VStack align="stretch" spacing={4}>
      <InputGroup>
        <Input
          value={customerInput}
          onChange={handleChangeId}
          pr='4.5rem'
          type='text'
          placeholder='CPF/CNPJ'
        />
        <InputRightElement mr={2}>
          <Button
            colorScheme='teal'
            h='1.75rem'
            size='sm'
            onClick={onSearchCustomer}
          >
            <Search2Icon color='white' />
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* {findedCustomer && !createCustomer && (
        <HStack>
          <Text fontWeight='semibold'>Cliente:</Text>
          <Text>Ana Maria</Text>
        </HStack>
      )}

      {createCustomer && !findedCustomer && (
        <HStack justify='center'>
          <Button colorScheme='teal' onClick={() => onCreateCustomer()}>Criar cliente</Button>
        </HStack>
      )} */}

      <Divider />

      {cart && cart?.length > 0 && (
        <VStack spacing={8}>
          {cart.map((item: cart, key: number) => (
            <ProductCart
              key={key}
              product={item.product}
              quantity={item.quantity}
              removeProduct={() => removeProduct(item.product)}
            />
          ))}
        </VStack>
      )}
    </VStack>
  )
}
