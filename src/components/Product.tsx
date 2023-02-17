import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Image,
  useColorModeValue,
  Text,
  HStack,
  IconButton,
  VStack,
  useToast,
  Divider
} from '@chakra-ui/react'
import { useCart } from '../contexts/CartContext'
import { product } from '../types/api'
import notFoundImage from '../assets/images/not-found-image.png'

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

  function checkImage() {
    if (imagemBase64) return `data:image/png;base64, ${imagemBase64}`

    return notFoundImage
  }

  function addItemProduct() {
    cart?.addItemProduct(product)

    toast({
      description: `Item ${nome} adicionado(a) com sucesso!`,
      status: 'success',
      duration: 2000
    })
  }

  function removeItemProduct() {
    cart.removeItemProduct(product)

    toast({
      description: `Item ${nome} removido(a) com sucesso!`,
      status: 'success',
      duration: 2000
    })
  }
  return (
    <VStack
      bg={useColorModeValue('white', 'gray.800')}
      rounded="lg"
      shadow="lg"
      spacing={2}
      maxH="230px"
      overflow="hidden"
    >
      <HStack w="full" h="15%" px={3} py={5} backgroundColor="teal">
        <Text
          w="90%"
          fontSize="xl"
          fontWeight="medium"
          color="white"
          overflow="auto"
          whiteSpace="nowrap"
        >
          {nome}
        </Text>
        <Text
          w="10%"
          top={2}
          right={3}
          fontSize="xs"
          fontWeight="semibold"
          color="whiteAlpha.800"
          textAlign="end"
        >
          {estoqueAtual || 0}
        </Text>
      </HStack>

      <HStack w="full" h="70%" overflow="hidden" spacing={1} p={3}>
        <Image
          borderRadius="lg"
          width="100px"
          src={checkImage()}
          alt={`Picture of ${nomeImagem}`}
        />
        <Text fontSize="sm" h="full" w="100%" overflow="auto">
          {descricao}
        </Text>
        <VStack spacing={5}>
          <IconButton
            colorScheme="teal"
            aria-label="Search database"
            icon={<AddIcon />}
            variant="outline"
            onClick={addItemProduct}
          />
          <IconButton
            colorScheme="red"
            aria-label="Search database"
            icon={<MinusIcon />}
            variant="outline"
            onClick={removeItemProduct}
          />
        </VStack>
      </HStack>

      <Divider color='teal' />

      <HStack
        w="full"
        h="15%"
        p={3}
        justifyContent="center"
        fontSize="xl"
      >
        <Text fontWeight="semibold">Preço:</Text>
        <Text>R$ {valorUnidade}</Text>
      </HStack>
    </VStack>
  )
}

export default Product
