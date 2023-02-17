import { Button } from '@chakra-ui/button'
import { HStack, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useCustomer } from '../../contexts/CustomerContext'
import parseCurrencyString from '../../utils/parseCurrencyString'
import parseLocaleCurrency from '../../utils/parseLocaleCurrency'

interface ResumeCartFooterProps {
  onToggleSidepaneDrawer(): void
}

export default function ResumeCartFooter({ onToggleSidepaneDrawer }: ResumeCartFooterProps) {
  const toast = useToast()
  const { customer } = useCustomer()
  const { cart } = useCart()
  const navigate = useNavigate()

  function totalBudget() {
    let total = 0

    for (const value of cart) {
      total += (value.quantity * parseCurrencyString(value.product.valorUnidade))
    }

    return total
  }

  function onclickContinueCart() {
    if (!customer) {
      return toast({
        title: 'Cliente não encontrado!',
        description:
          'Para continuar com o pedido, adicione um cliente pelo CPF/CNPJ.',
        status: 'error',
        duration: 2000
      })
    }

    if (!cart || cart.length === 0) {
      return toast({
        title: 'Carrinho vazio!',
        description:
          'Para continuar com o pedido, adicione um produto ao carrinho.',
        status: 'error',
        duration: 2000
      })
    }

    onToggleSidepaneDrawer()
    navigate('/resume-cart')
  }
  return (
    <HStack w="100%" justify="space-between">
      <HStack>
        <Text fontSize="lg" fontWeight="semibold">
          Valor total:
        </Text>
        <Text>{parseLocaleCurrency(totalBudget())}</Text>
      </HStack>
      <Button colorScheme="teal" onClick={onclickContinueCart}>
        Continuar
      </Button>
    </HStack>
  )
}
