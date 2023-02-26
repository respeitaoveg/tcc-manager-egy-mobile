import { Button } from "@chakra-ui/button"
import { Box, Text, VStack } from "@chakra-ui/layout"
import { useColorModeValue } from '@chakra-ui/color-mode'
import MyInput from "../../components/forms/parts/MyInput"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useToast } from "@chakra-ui/react"
import { useCustomer } from "../../contexts/CustomerContext"
import { useNavigate } from "react-router-dom"
import { checkCpfCnpj, cpfRegex, msgInvalidCpfCnpj } from "../../utils/validateCpfCnpj"

const schema = yup.object().shape({
  nome: yup.string().required('Campo requerido'),
  cpfCnpj: yup.string().required('Campo requerido').when((builder, schema) => {
    const aux = builder[0].length

    const isValid = checkCpfCnpj(aux)

    if (!isValid) return schema.matches(cpfRegex, msgInvalidCpfCnpj)

    return schema
  }),
  email: yup.string().email('Email inválido').required('Campo requerido'),
  codigoIBGE: yup.string(),
  telefone: yup.string().required('Campo requerido'),
  cep: yup.string().required('Campo requerido'),
  endereco: yup.string().required('Campo requerido'),
  numero: yup.number().required('Campo requerido'),
  cidade: yup.string().required('Campo requerido'),
  bairro: yup.string().required('Campo requerido'),
  estado: yup.string().required('Campo requerido'),
  login: yup.string(),
  roleGD: yup.string().default('CLIENTE'),
})

interface CreateCustomeInputs {
  nome: string
  cpfCnpj: string
  email: string
  codigoIBGE: string
  telefone: string
  cep: string
  endereco: string
  numero: number
  cidade: string
  bairro: string
  estado: string
  login: string
  roleGD: 'CLIENTE'
}

export default function CreateCustomerForm() {
  const toast = useToast()
  const { createCustomer } = useCustomer()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CreateCustomeInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  async function onSubmit(values: CreateCustomeInputs) {
    values.login = values.cpfCnpj

    const response = await createCustomer(values)

    if (response) {
      toast({
        title: 'Cliente criado!',
        description: 'Cliente criado com sucesso.',
        status: 'success',
        duration: 2000
      })

      navigate('/')
    }
  }

  const cepWatch = watch('cep') || ''

  useEffect(() => {
    if (cepWatch.length === 8) fillHome()
  },[cepWatch])

  async function fillHome() {
    const data = await fetch(`https://viacep.com.br/ws/${cepWatch}/json/ `)
        .then(resp => resp.json())
        .catch(error => console.error(error))


    if(data.erro) return toast({
      title: 'CEP não encontrado!',
      description: 'CEP não encontrado.',
      status: 'error',
      duration: 2000
    })

    toast({
      title: 'CEP encontrado!',
      description: 'CEP encontrado com sucesso.',
      status: 'success',
      duration: 2000
    })

    setValue('endereco', data.logradouro)
    setValue('cidade', data.localidade)
    setValue('bairro', data.bairro)
    setValue('estado', data.uf)
    setValue('codigoIBGE', data.ibge)
  }

  return (
    <form>
      <VStack
        bg={useColorModeValue('white', 'gray.800')}
        rounded="lg"
        shadow="lg"
        padding={2}
        spacing={4}
        width="100%"
      >
        <Text fontSize='2xl'>Criar cliente</Text>
        <MyInput
          id='nome'
          type='text'
          formLabel='Nome'
          error={errors.nome?.message}
          register={{...register('nome')}}
          isRequired
        />
        <MyInput
          id='cpfCnpj'
          type='text'
          formLabel='CPF/CNPJ'
          error={errors.cpfCnpj?.message}
          register={{...register('cpfCnpj')}}
          isRequired
        />
        <MyInput
          id='email'
          type='email'
          formLabel='Email'
          error={errors.email?.message}
          register={{...register('email')}}
          isRequired
        />
        <MyInput
          id='telefone'
          type='text'
          formLabel='Telefone'
          error={errors.telefone?.message}
          register={{...register('telefone')}}
          isRequired
        />
        <MyInput
          id='cep'
          type='text'
          formLabel='CEP'
          error={errors.cep?.message}
          register={{...register('cep')}}
          isRequired
        />
        <MyInput
          id='endereco'
          type='text'
          formLabel='Endereço'
          error={errors.endereco?.message}
          register={{...register('endereco')}}
          isRequired
        />
        <MyInput
          id='numero'
          type='text'
          formLabel='Número'
          error={errors.numero?.message}
          register={{...register('numero')}}
          isRequired
        />
        <MyInput
          id='cidade'
          type='text'
          formLabel='Cidade'
          error={errors.cidade?.message}
          register={{...register('cidade')}}
          isRequired
        />
        <MyInput
          id='bairro'
          type='text'
          formLabel='Bairro'
          error={errors.bairro?.message}
          register={{...register('bairro')}}
          isRequired
        />
        <MyInput
          id='estado'
          type='text'
          formLabel='Estado'
          error={errors.estado?.message}
          register={{...register('estado')}}
          isRequired
        />
        <Box w='full' pt={6}>
          <Button w='full' onClick={handleSubmit(onSubmit)} colorScheme="teal">
            Criar
          </Button>
        </Box>
      </VStack>
    </form>
  )
}