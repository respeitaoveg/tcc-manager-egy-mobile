import {
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
  Text
} from '@chakra-ui/react'
import ProductCart from './ProductCart'
import { ChangeEvent, useState } from 'react'
import { Search2Icon } from '@chakra-ui/icons'
import { useCart } from '../../contexts/CartContext'
import { cart } from '../../types/api'
import { useCustomer } from '../../contexts/CustomerContext'
import { Navigate, useNavigate } from 'react-router-dom'

interface CartProps {
  onToggleSidepaneDrawer(): void
}

export default function Cart({ onToggleSidepaneDrawer }: CartProps) {
  const toast = useToast()
  const { cart, removeProduct } = useCart()
  const { consultCustomer, customer } = useCustomer()
  const navigate = useNavigate()

  const [customerInput, setCustomerInput] = useState('')

  function handleChangeId(e: ChangeEvent<HTMLInputElement>) {
    setCustomerInput(e.target.value)
  }

  async function handleSearchCustomer() {
    const customer = await consultCustomer(customerInput)

    if (customer) {
      toast({
        title: 'Encontrado!',
        description: 'Cliente encontrado com sucesso',
        status: 'success',
        duration: 2000
      })
    } else {
      toast({
        title: 'Não encontrado!',
        description: 'Cliente não encontrado.',
        status: 'error',
        duration: 2000
      })
    }
  }

  const onCreateCustomer = () => {

    navigate('/customer/create')

    onToggleSidepaneDrawer()
  }

  return (
    <VStack align="stretch" spacing={4}>
      <InputGroup>
        <Input
          value={customerInput}
          onChange={handleChangeId}
          pr="4.5rem"
          type="text"
          placeholder="CPF/CNPJ"
        />
        <InputRightElement mr={2}>
          <Button
            colorScheme="teal"
            h="1.75rem"
            size="sm"
            onClick={handleSearchCustomer}
          >
            <Search2Icon color="white" />
          </Button>
        </InputRightElement>
      </InputGroup>

      {customer && (
        <HStack>
          <Text fontWeight='semibold'>Cliente:</Text>
          <Text>Ana Maria</Text>
        </HStack>
      )}

      {!customer && (
        <HStack justify='center'>
          <Button colorScheme='teal' onClick={() => onCreateCustomer()}>Criar cliente</Button>
        </HStack>
      )}

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
