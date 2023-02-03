import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  useColorModeValue
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [loginInput, setLoginInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  function handleClickLogin() {
    auth?.login(loginInput, passwordInput)
  }

  useEffect(() => {
    if (auth?.user) navigate('/')
  }, [auth?.user])

  function handleLoginInputChange(e: ChangeEvent<HTMLInputElement>) {
    setLoginInput(e.target.value)
  }

  function handlePasswordInputChange(e: ChangeEvent<HTMLInputElement>) {
    setPasswordInput(e.target.value)
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="login">
              <FormLabel>CPF/CNPJ</FormLabel>
              <Input type="login" value={loginInput} onChange={handleLoginInputChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" value={passwordInput} onChange={handlePasswordInputChange} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Lembrar-me</Checkbox>
                <Link color={'blue.400'}>Esqueceu a senha?</Link>
              </Stack>
              <Button onClick={handleClickLogin} colorScheme="blue">
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
