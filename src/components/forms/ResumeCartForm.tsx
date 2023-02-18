import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { HStack, Text, VStack } from '@chakra-ui/layout'
import { FormLabel } from '@chakra-ui/form-control'
import { Button, useToast } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/switch'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { MySelect } from './parts/MySelect'
import { requestRegisterBudget } from '../../types/api'
import { useCustomer } from '../../contexts/CustomerContext'
import { useCart } from '../../contexts/CartContext'
import { ClientApi } from '../../services/ClientApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResumeCartForm() {
  const { customer } = useCustomer()
  const { cart } = useCart()
  const api = new ClientApi()
  const toast = useToast()
  const navigate = useNavigate()

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

    if (response) toast({
      title: 'Orçamento gerado!',
      description: 'Orçamento gerado com sucesso.',
      status: 'success',
      duration: 2000
    })

    if (hasInvoice && response?.id) {
      const responseInvoice = await api.invoice({ budgetId: response.id.toString() })

      if (responseInvoice) toast({
        title: 'Nota gerada!',
        description: 'Nota gerada com sucesso.',
        status: 'success',
        duration: 5000
      })
    }

    navigate('/')
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
          options={['DINHEIRO', 'CHEQUE', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'CREDITO_LOJA', 'VALE_ALIMENTACAO', 'VALE_REFEICAO', 'VALE_PRESENTE', 'VALE_COMBUSTIVEL', 'OUTROS']}
          isRequired
        />
        <MySelect
          id="bandeira"
          formLabel="Bandeira"
          error={errors.bandeira?.message}
          register={register('bandeira')}
          options={['MASTERCARD', 'VISA', 'ELO', 'AMERICAN_EXPRESS', 'HIPERCARD']}
          isRequired
        />
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          width="100%"
          colorScheme="teal"
        >
          Confirmar
        </Button>
      </VStack>
    </form>
  )
}
