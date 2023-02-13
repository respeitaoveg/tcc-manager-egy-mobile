import { useState, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useColorModeValue, Stack, FormControl, FormLabel, Input, Checkbox, Button, Box, Link, FormErrorMessage } from '@chakra-ui/react'
import MyInput from './parts/MyInput'
import { useAuth } from '../../contexts/AuthContext'

const schema = yup.object().shape({
  login: yup.string().required('Campo requerido'),
  password: yup.string().required('Campo requerido')
})

interface LoginFormInputs {
  login: string,
  password: string
}

export default function LoginForm() {
  const auth = useAuth()
  const { register, handleSubmit, formState: { errors }, getValues} = useForm<LoginFormInputs>({
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
                <Checkbox>Lembrar-me</Checkbox>
                <Link color={'blue.400'}>Esqueceu a senha?</Link>
              </Stack>
              <Button onClick={handleSubmit(onSubmit)} colorScheme="blue">
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </form>
  )
}