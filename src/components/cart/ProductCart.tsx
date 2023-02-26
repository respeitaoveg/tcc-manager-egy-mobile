import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Image,
  useColorModeValue,
  Text,
  HStack,
  IconButton,
  VStack,
  useToast,
  Divider,
  Tag
} from '@chakra-ui/react'
import { product } from '../../types/api'
import { useCart } from '../../contexts/CartContext'
import parseCurrencyString from '../../utils/parseCurrencyString'
import parseLocaleCurrency from '../../utils/parseLocaleCurrency'
import checkImage from '../../utils/checkImage'
import checkDescription from '../../utils/checkDescription'

interface ProductCartProps {
  product: product
  quantity: number
}

export default function ProductCart({ product, quantity }: ProductCartProps) {
  const toast = useToast()
  const { addItemProduct, removeItemProduct } = useCart()

  const {
    nome,
    descricao,
    imagemBase64,
    nomeImagem,
    valorUnidade
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
      w='full'
      overflow="hidden"
    >
      <HStack w="full" h="15%" px={3} pb={1} spacing={3} borderBottom='solid 1px teal'>
        <Text
          w="100%"
          fontSize="lg"
          fontWeight="medium"
          color="teal"
          whiteSpace="nowrap"
          lineHeight='normal'
          overflow='auto'
        >
          {nome}
        </Text>
        <Tag
          textAlign="end"
          colorScheme='teal'
        >
          x{quantity || 0}
        </Tag>
      </HStack>

      <HStack w="full" h="150px" overflow="hidden" spacing={1} p={3}>
        <Image
          borderRadius="lg"
          width="75px"
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

      <Divider color='teal' />

      <VStack px={3} py={2} w='100%' alignItems='flex-start'>
        <HStack>
          <Text fontWeight="semibold">Preço unitário:</Text>
          <Text>{parseLocaleCurrency(parseCurrencyString(valorUnidade))}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="semibold">Preço pela quantidade:</Text>
          <Text>{parseLocaleCurrency((quantity * parseCurrencyString(valorUnidade)))}</Text>
        </HStack>
      </VStack>
    </VStack>
  )
}
