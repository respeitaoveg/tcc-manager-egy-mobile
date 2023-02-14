import { useColorModeValue } from '@chakra-ui/color-mode'
import { HStack, Text, VStack } from '@chakra-ui/layout'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/table'
import ResumeCartForm from '../components/forms/ResumeCartForm'
import { useCart } from '../contexts/CartContext'
import { useCustomer } from '../contexts/CustomerContext'

export default function ResumeCart() {
  const { customer } = useCustomer()
  const { cart } = useCart()

  function totalBudget() {
    let total = 0

    for (const value of cart) {
      total += parseFloat(value.product.valorUnidade) * value.quantity
    }

    return total
  }

  return (
    <VStack spacing={8}>
      <VStack
        bg={useColorModeValue('white', 'gray.800')}
        rounded="lg"
        shadow="lg"
        padding={2}
        spacing={4}
        width={'100%'}
      >
        <Text fontWeight="semibold">Resumo cliente</Text>

        <HStack width={'100%'}>
          <Text fontWeight="semibold">Nome:</Text>
          <Text>{customer?.nome}</Text>
        </HStack>
        <HStack width={'100%'}>
          <Text fontWeight="semibold">CPF/CNPJ:</Text>
          <Text>{customer?.cpfCnpj}</Text>
        </HStack>
        <HStack width={'100%'}>
          <Text fontWeight="semibold">Email:</Text>
          <Text>test@test.com</Text>
        </HStack>
        <HStack width={'100%'}>
          <Text fontWeight="semibold">Telefone:</Text>
          <Text>(41) 9 9999-9999</Text>
        </HStack>
      </VStack>

      <VStack
        bg={useColorModeValue('white', 'gray.800')}
        rounded="lg"
        shadow="lg"
        spacing={4}
        paddingY={2}
        width={'100%'}
      >
        <Text fontWeight="semibold">Resumo da compra</Text>
        <TableContainer w='100%'>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th isNumeric>Quantidade</Th>
                <Th isNumeric>Preço unidade</Th>
                <Th isNumeric>Preço Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.map((value, index) => (
                <Tr key={index}>
                  <Td>{value.product.nome}</Td>
                  <Td isNumeric>{value.quantity}</Td>
                  <Td isNumeric>{parseFloat(value.product.valorUnidade)}</Td>
                  <Td isNumeric>
                    {parseFloat(value.product.valorUnidade) * value.quantity}
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Valor total</Th>
                <Th isNumeric>{totalBudget()}</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </VStack>

      <ResumeCartForm />
    </VStack>
  )
}
