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
import LoginForm from '../components/forms/LoginForm'
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
      <LoginForm />
    </Flex>
  )
}
