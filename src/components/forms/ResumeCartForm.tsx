import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { HStack, Text, VStack } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Button, Select } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/switch'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { MySelect } from './parts/MySelect'



const schema = yup.object().shape({
  bandeira: yup.string().required(),
  formaPagamento: yup.string().required()
})

interface ResumeCartInputs {
  bandeira: string
  formaPagamento: string
}

export default function ResumeCartForm() {
  const { register, handleSubmit, formState: { errors }} = useForm<ResumeCartInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  function onSubmit(values: ResumeCartInputs) {
    console.log(333, values)
  }

  return (
    <form style={{width: '100%'}}>
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
        <MySelect
          id='formaPagamento'
          formLabel='Forma de pagamento'
          error={errors.formaPagamento?.message}
          register={register('formaPagamento')}
          options={['Pix', 'Cartão de crédito', 'Dinheiro']}
          isRequired
        />
        <MySelect
          id='bandeira'
          formLabel='Bandeira'
          error={errors.bandeira?.message}
          register={register('bandeira')}
          options={['Mastercard', 'Cielo']}
          isRequired
        />
        <Button type='submit' onClick={handleSubmit(onSubmit)} width="100%" colorScheme="blue">
          Confirmar
        </Button>
      </VStack>
    </form>
  )
}
