import { Button } from '@chakra-ui/button'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { HStack, Text, VStack } from '@chakra-ui/layout'
import { Box, Select } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/switch'
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
import { useCart } from '../contexts/CartContext'
import { useCustomer } from '../contexts/CustomerContext'

export default function ResumeCart() {
  const { customer } = useCustomer()
  const { cart } = useCart()

  console.log(111, customer)
  console.log(222, cart)

  function totalBudget() {
    let total = 0

    for (const value of cart) {
      total += parseFloat(value.product.valorUnidade) * value.quantity
    }

    return total
  }

  return (
    <VStack spacing={8} maxWidth="600px">
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
        <TableContainer>
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

      <VStack
        bg={useColorModeValue('white', 'gray.800')}
        rounded="lg"
        shadow="lg"
        padding={2}
        spacing={4}
        width={'100%'}
      >
        <Text fontWeight="semibold">Foma de pagamento</Text>

        <HStack w="full">
          <FormLabel htmlFor="email-alerts" mb="0">
            <Text fontWeight="semibold">Gerar nota fiscal?</Text>
          </FormLabel>
          <Switch id="email-alerts" />
        </HStack>
        <Box w="full">
          <Text fontSize="sm" fontWeight="semibold">
            Forma de pagamento
          </Text>
          <Select placeholder="Selecione">
            <option value="card">Cartão</option>
            <option value="pix">Pix</option>
            <option value="cash">Dinheiro</option>
          </Select>
        </Box>
        <Box w="full">
          <Text fontSize="sm" fontWeight="semibold">
            Bandeira
          </Text>
          <Select placeholder="Selecione">
            <option value="option1">Mastercard</option>
          </Select>
        </Box>
      </VStack>

      <Button width="100%" colorScheme="blue">
        Confirmar
      </Button>
    </VStack>
  )
}
