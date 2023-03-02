import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useColorModeValue, Stack, Button, Box, Text } from '@chakra-ui/react'
import MyInput from './parts/MyInput'
import { useAuth } from '../../contexts/AuthContext'
import { cpfRegex, checkCpfCnpj, dynamicMaskCpfCnpj, msgInvalidCpfCnpj } from '../../utils/validateCpfCnpj'
import { useEffect, useState } from 'react'
import parseOnlyDigits from '../../utils/parseOnlyDigits'

const schema = yup.object().shape({
  login: yup.string().required('Campo requerido').when((builder, schema) => {
    const login = parseOnlyDigits(builder[0])

    const loginLength = login?.length

    if (loginLength) {
      const isValid = checkCpfCnpj(loginLength)

      if (!isValid) return schema.matches(cpfRegex, msgInvalidCpfCnpj)
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
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors }, watch} = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const [mask, setMask] = useState('')

  function onSubmit(values: LoginFormInputs) {
    login(values.login, values.password)
  }

  const loginWatch = watch('login')

  useEffect(() => {
    if (loginWatch) {
      const digits = parseOnlyDigits(loginWatch)

      if (digits) {
        const aux = dynamicMaskCpfCnpj(digits)
        console.log(loginWatch)

        setMask(aux)
      }
    }
  }, [loginWatch])

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
              register={register('login')}
              mask={mask}
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