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

  useEffect(() => {
    if (auth?.user) navigate('/')
  }, [auth?.user])

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
