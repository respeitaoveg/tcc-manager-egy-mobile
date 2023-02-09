import { AddIcon } from '@chakra-ui/icons'
import {
  Image,
  useColorModeValue,
  Text,
  HStack,
  IconButton,
  Flex,
  VStack,
  useToast
} from '@chakra-ui/react'
import { product } from '../../types/api'

export default function ProductCartResume(product: product, quantity: number) {
  const toast = useToast()

  function addProduct() {
    toast({
      description: `${product.nome} adicionado(a) com sucesso!`,
      status: 'success',
      duration: 2000
    })
  }
  return (
    <HStack
      bg={useColorModeValue('white', 'gray.800')}
      rounded="lg"
      shadow="lg"
      padding={2}
      spacing={2}
      maxWidth="600px"
      position="relative"
    >
      <Image
        borderRadius="lg"
        width="25%"
        src={product.imagemBase64}
        alt={`Picture of ${product.nomeImagem}`}
      />

      <VStack alignItems="start" width="60%">
        <Text fontSize="xl">{product.nome}</Text>
        <Text fontSize="sm">{product.descricao}</Text>
        <HStack>
          <Text fontWeight="semibold">Preço:</Text>
          <Text>R$ {product.valorUnidade}</Text>
        </HStack>
      </VStack>

      <Flex w="15%" justify="center">
        <IconButton
          colorScheme="teal"
          aria-label="Search database"
          icon={<AddIcon />}
          variant="outline"
          onClick={addProduct}
        />
        <Text
          position="absolute"
          top={2}
          right={3}
          fontSize="xs"
          fontWeight="semibold"
          color="gray"
        >
          {quantity}
        </Text>
      </Flex>
    </HStack>
  )
}
