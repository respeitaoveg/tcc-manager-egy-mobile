import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Box, HStack, Text, VStack } from "@chakra-ui/layout"
import { Select } from "@chakra-ui/select"
import { useToast } from "@chakra-ui/toast"
import { useNavigate } from "react-router-dom"

export default function CreateCustomer() {
  const toast = useToast()
  const navigate = useNavigate()

  function handleCreateCustomer() {
    toast({
      title: 'Cliente criado!',
      description: 'Cliente criado com sucesso!',
      status: 'success',
      duration: 2000
    })

    navigate('/')
  }

  return (
    <VStack bgColor='white' p={4} rounded='md' shadow='lg' spacing={8}>
      <HStack w='full' justifyContent='space-between'>
        <Text fontSize='2xl'>Criar cliente</Text>
      </HStack>

      <VStack w='full' spacing={4}>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Nome</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>CPF/CNPJ</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Email</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>DDD</Text>
          <Select placeholder='Selecione'>
            <option value='option1'>41</option>
            <option value='option2'>42</option>
            <option value='option3'>43</option>
          </Select>
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Telefone</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>CEP</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Endereço</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Número</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Bairro</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Cidade</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Estado</Text>
          <Select placeholder='Selecione'>
            <option value='option1'>PR</option>
            <option value='option2'>SP</option>
            <option value='option3'>CE</option>
          </Select>
        </Box>
      </VStack>

      <Box w='full' display='flex' justifyContent='flex-end'>
        <Button onClick={handleCreateCustomer} colorScheme="blue">
          Salvar
        </Button>
      </Box>
    </VStack>
  )
}