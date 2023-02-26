import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Image,
  useColorModeValue,
  Text,
  HStack,
  IconButton,
  VStack
} from '@chakra-ui/react'
import { useCart } from '../contexts/CartContext'
import { product } from '../types/api'
import parseCurrencyString from '../utils/parseCurrencyString'
import parseLocaleCurrency from '../utils/parseLocaleCurrency'
import checkImage from '../utils/checkImage'
import checkDescription from '../utils/checkDescription'

function Product(product: product) {
  const { removeItemProduct, addItemProduct} = useCart()

  const {
    nome,
    descricao,
    imagemBase64,
    nomeImagem,
    valorUnidade,
    estoqueAtual
  } = product

  function _addItemProduct() {
    addItemProduct(product)
  }

  function _removeItemProduct() {
    removeItemProduct(product)
  }
  return (
    <VStack
      bg={useColorModeValue('white', 'gray.800')}
      rounded="lg"
      shadow="lg"
      spacing={2}
      maxH="250px"
      minH='250px'
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
          lineHeight='normal'
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

      <HStack w="full" h="70%" overflow="hidden" spacing={1} p={3} borderBottom='1px solid teal'>
        <Image
          borderRadius="lg"
          width="100px"
          src={checkImage(imagemBase64)}
          alt={`Picture of ${nomeImagem}`}
        />
        <Text fontSize="sm" h="full" w="100%" overflow="auto">
          {checkDescription(descricao)}
        </Text>
        <VStack spacing={5}>
          <IconButton
            colorScheme="teal"
            aria-label="Search database"
            icon={<AddIcon />}
            variant="outline"
            onClick={_addItemProduct}
          />
          <IconButton
            colorScheme="red"
            aria-label="Search database"
            icon={<MinusIcon />}
            variant="outline"
            onClick={_removeItemProduct}
          />
        </VStack>
      </HStack>

      <HStack
        w="full"
        h="15%"
        justifyContent="center"
        align='center'
        pb={2}
        fontSize="xl"
      >
        <Text color='teal.600'>{parseLocaleCurrency(parseCurrencyString(valorUnidade))}</Text>
      </HStack>
    </VStack>
  )
}

export default Product
