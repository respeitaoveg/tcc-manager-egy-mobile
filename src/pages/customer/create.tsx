import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Box, HStack, Text, VStack } from "@chakra-ui/layout"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Switch } from "@chakra-ui/switch"
import { useBoolean } from "@chakra-ui/hooks"
import { Select } from "@chakra-ui/select"
import { useToast } from "@chakra-ui/toast"

export default function CreateCustomer() {
  const toast = useToast()
  const [isCNPJ, setIsCNPJ] = useBoolean()

  function handleCreateCustomer() {
    toast({
      title: 'Cliente criado!',
      description: 'Cliente criado com sucesso!',
      status: 'success',
      duration: 2000
    })

    // Router.push('/')
  }

  return (
    <VStack bgColor='white' p={4} rounded='md' shadow='lg' spacing={8}>
      <HStack w='full' justifyContent='space-between'>
        <Text fontSize='2xl'>Criar cliente</Text>
        <FormControl display='flex' alignItems='center' w='min-content'>
          <FormLabel htmlFor='toggle-cnpj' mb='0'>
            CNPJ
          </FormLabel>
          <Switch id='toggle-cnpj' onChange={setIsCNPJ.toggle} />
        </FormControl>
      </HStack>

      <VStack w='full' spacing={4}>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Nome</Text>
          <Input placeholder='...' />
        </Box>

        {!isCNPJ ?
          <>
            <Box w='full'>
              <Text fontSize='sm' fontWeight='semibold'>Sobrenome</Text>
              <Input placeholder='...' />
            </Box>
            <Box w='full'>
              <Text fontSize='sm' fontWeight='semibold'>CPF</Text>
              <Input placeholder='...' />
            </Box>
          </>
        :
          <>
            <Box w='full'>
              <Text fontSize='sm' fontWeight='semibold'>CNPJ</Text>
              <Input placeholder='...' />
            </Box>
            <Box w='full'>
              <Text fontSize='sm' fontWeight='semibold'>Inscrição estadual</Text>
              <Input placeholder='...' />
            </Box>
          </>
        }

        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Email</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>CEP</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Rua</Text>
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
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Número</Text>
          <Input placeholder='...' />
        </Box>
        <Box w='full'>
          <Text fontSize='sm' fontWeight='semibold'>Telefone</Text>
          <Input placeholder='...' />
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