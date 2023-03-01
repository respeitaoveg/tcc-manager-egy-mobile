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
import { cpfCnpjRegex, msgInvalidCpfCnpj } from '../../utils/validateCpfCnpj'
import parseOnlyDigits from '../../utils/parseOnlyDigits'

interface CartProps {
  onToggleSidepaneDrawer(): void
}

export default function Cart({ onToggleSidepaneDrawer }: CartProps) {
  const toast = useToast()
  const { cart, clearCart } = useCart()
  const { consultCustomer, customer, removeCustomer } = useCustomer()
  const navigate = useNavigate()

  const [customerInput, setCustomerInput] = useState('')

  function handleChangeId(e: ChangeEvent<HTMLInputElement>) {
    setCustomerInput(e.target.value)
  }

  async function handleSearchCustomer() {
    if (!cpfCnpjRegex.test(customerInput)) {
      return toast({
        title: msgInvalidCpfCnpj,
        status: 'error',
        duration: 2000
      })
    }

    const loginDigits = parseOnlyDigits(customerInput)

    if (loginDigits) {
      consultCustomer(loginDigits)
    }
  }

  function createCustomer() {
    navigate('/customer/create')

    onToggleSidepaneDrawer()
  }

  function handleRemoveCustomer() {
    removeCustomer()
  }

  function handleClearCart() {
    clearCart(true)

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
          <Button variant='outline' colorScheme='teal' onClick={() => createCustomer()}>Criar cliente</Button>
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
          <Button variant='outline' colorScheme='red' onClick={() => handleClearCart()}>Limpar</Button>
        </VStack>
      )}

    </VStack>
  )
}
