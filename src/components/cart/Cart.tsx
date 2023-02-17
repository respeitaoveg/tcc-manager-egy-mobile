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
import { CloseIcon, Search2Icon } from '@chakra-ui/icons'
import { useCart } from '../../contexts/CartContext'
import { cart } from '../../types/api'
import { useCustomer } from '../../contexts/CustomerContext'
import { useNavigate } from 'react-router-dom'

interface CartProps {
  onToggleSidepaneDrawer(): void
}

export default function Cart({ onToggleSidepaneDrawer }: CartProps) {
  const toast = useToast()
  const { cart, removeProduct } = useCart()
  const { consultCustomer, customer, removeCustomer } = useCustomer()
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
        description: 'Cliente encontrado com sucesso.',
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

  function createCustomer() {
    navigate('/customer/create')

    onToggleSidepaneDrawer()
  }

  function handleRemoveCustomer() {
    removeCustomer()

    toast({
      title: 'Removido!',
      description: 'Cliente removido com sucesso.',
      status: 'success',
      duration: 2000
    })
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
        <HStack justify="space-between">
          <HStack>
            <Text fontWeight='semibold'>Cliente:</Text>
            <Text>{customer.nome}</Text>
          </HStack>
          <Button
            colorScheme="red"
            variant="ghost"
            onClick={() => handleRemoveCustomer()}
          >
            <CloseIcon color='red' />
          </Button>
        </HStack>
      )}

      {!customer && (
        <HStack justify='center'>
          <Button colorScheme='teal' onClick={() => createCustomer()}>Criar cliente</Button>
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
            />
          ))}
        </VStack>
      )}
    </VStack>
  )
}
