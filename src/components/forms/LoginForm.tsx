import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useColorModeValue, Stack, Button, Box, Text } from '@chakra-ui/react'
import MyInput from './parts/MyInput'
import { useAuth } from '../../contexts/AuthContext'
import { cpfRegex } from '../../utils/validateCpfCnpj'

const schema = yup.object().shape({
  login: yup.string().required('Campo requerido').when((builder, schema) => {
    const aux = builder[0].length
    const msg = 'CPF/CNPJ inválido'

    if (aux > 0) {
      if (aux < 11) return schema.matches(cpfRegex, msg)
      if (aux > 11 && aux < 14) return schema.matches(cpfRegex, msg)
      if (aux > 14) return schema.matches(cpfRegex, msg)
    }

    return schema
  }),
  password: yup.string().required('Campo requerido')
})

interface LoginFormInputs {
  login: string,
  password: string
}

export default function LoginForm() {
  const auth = useAuth()
  const { register, handleSubmit, formState: { errors }} = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  function onSubmit(values: LoginFormInputs) {
    auth?.login(values.login, values.password)
  }

  return (
    <form>
      <Stack mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Text align='center' fontSize='3xl'>EGY</Text>
            <MyInput
              id='login'
              type='text'
              formLabel='CPF/CNPJ'
              error={errors.login?.message}
              register={{...register('login')}}
              isRequired
            />
            <MyInput
              id='login'
              type='password'
              formLabel='Senha'
              error={errors.password?.message}
              register={{...register('password')}}
              isRequired
            />
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
              </Stack>
              <Button onClick={handleSubmit(onSubmit)} colorScheme="teal">
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </form>
  )
}