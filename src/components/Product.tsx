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
import { useCart } from '../contexts/CartContext'
import { product } from '../types/api'

function Product(product: product) {
  const toast = useToast()
  const cart = useCart()

  const {
    nome,
    descricao,
    imagemBase64,
    nomeImagem,
    valorUnidade,
    estoqueAtual
  } = product

  function addProduct() {
    cart?.addProduct(product)

    toast({
      description: `${nome} adicionado(a) com sucesso!`,
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
      maxH='200px'
      position="relative"
    >
      <Image
        borderRadius="lg"
        width="25%"
        maxW= '150px'
        src={`data:image/png;base64, ${imagemBase64}`}
        alt={`Picture of ${nomeImagem}`}
      />

      <VStack alignItems="start" width="60%" overflow='hidden'>
        <Text w='100%' fontSize="xl" overflow='auto' whiteSpace='nowrap'>{nome}</Text>
        <Text fontSize="sm">{descricao}</Text>
        <HStack>
          <Text fontWeight="semibold">Preço:</Text>
          <Text>R$ {valorUnidade}</Text>
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
          {estoqueAtual}
        </Text>
      </Flex>
    </HStack>
  )
}

export default Product
