import { Button } from '@chakra-ui/button'
import { HStack, Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { useCart } from '../../contexts/CartContext'

interface ResumeCartFooterProps {
  onToggleSidepaneDrawer(): void
}

export default function ResumeCartFooter({ onToggleSidepaneDrawer }: ResumeCartFooterProps) {
  const toast = useToast()
  const isFindedUser = false

  const { cart } = useCart()

  function totalBudget() {
    let total = 0

    for (const value of cart) {
      total += parseFloat(value.product.valorUnidade) * value.quantity
    }

    return total
  }

  function onclickContinueCart() {
    if (!isFindedUser) {
      return toast({
        title: 'Cliente não encontrado!',
        description:
          'Para continuar com o pedido, adicione um cliente pelo CPF/CNPJ',
        status: 'error',
        duration: 2000
      })
    }

    onToggleSidepaneDrawer()
    // router.push('/resumeOrdered')
  }
  return (
    <HStack w="100%" justify="space-between">
      <HStack>
        <Text fontSize="lg" fontWeight="semibold">
          Valor total:
        </Text>
        <Text>R$ {totalBudget()}</Text>
      </HStack>
      <Button colorScheme="blue" onClick={onclickContinueCart}>
        Continuar
      </Button>
    </HStack>
  )
}
