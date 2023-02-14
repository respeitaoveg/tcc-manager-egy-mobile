import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { HStack, Text, VStack } from '@chakra-ui/layout'
import { FormLabel } from '@chakra-ui/form-control'
import { Button } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/switch'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { MySelect } from './parts/MySelect'
import { requestRegisterBudget } from '../../types/api'
import { useCustomer } from '../../contexts/CustomerContext'
import { useCart } from '../../contexts/CartContext'
import { ClientApi } from '../../services/ClientApi'
import { useState } from 'react'

export default function ResumeCartForm() {
  const { customer } = useCustomer()
  const { cart } = useCart()
  const api = new ClientApi()

  const [hasInvoice, setHasInvoice] = useState(false)

  const schema = yup.object().shape({
    bandeira: yup.string().required(),
    formaPagamento: yup.string().required(),
    clienteId: yup.number().required().default(customer?.id),
    listaProdutoResponse: yup
      .array(
        yup.object({
          id: yup.number(),
          quantidade: yup.number()
        })
      )
      .default(
        cart.map((value) => ({
          id: value.product?.id,
          quantidade: value.quantity
        })) as any
      )
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<requestRegisterBudget>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  async function onSubmit(values: requestRegisterBudget) {
    const response = await api.registerBudget(values)

    if (hasInvoice && response?.id)
      api.invoice({ budgetId: response.id.toString() })

    console.log(111, response)
  }

  function handleOnChangeInvoice() {
    setHasInvoice(!hasInvoice)
  }

  return (
    <form style={{ width: '100%' }}>
      <VStack
        bg={useColorModeValue('white', 'gray.800')}
        rounded="lg"
        shadow="lg"
        padding={2}
        spacing={4}
        width="100%"
      >
        <Text fontWeight="semibold">Foma de pagamento</Text>
        <HStack w="full">
          <FormLabel htmlFor="invoice" mb="0">
            <Text fontWeight="semibold">Gerar nota fiscal?</Text>
          </FormLabel>
          <Switch
            id="invoice"
            isChecked={hasInvoice}
            onChange={handleOnChangeInvoice}
          />
        </HStack>
        <MySelect
          id="formaPagamento"
          formLabel="Forma de pagamento"
          error={errors.formaPagamento?.message}
          register={register('formaPagamento')}
          options={['DINHEIRO', 'CARTÃO DE CRÉDITO', 'PIX']}
          isRequired
        />
        <MySelect
          id="bandeira"
          formLabel="Bandeira"
          error={errors.bandeira?.message}
          register={register('bandeira')}
          options={['MASTERCARD', 'VISA']}
          isRequired
        />
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          width="100%"
          colorScheme="blue"
        >
          Confirmar
        </Button>
      </VStack>
    </form>
  )
}
