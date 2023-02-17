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
  Badge,
  Tag
} from '@chakra-ui/react'
import { product } from '../../types/api'
import notFoundImage from '../../assets/images/not-found-image.png'
import { useCart } from '../../contexts/CartContext'
import { useState } from 'react'

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

  function checkImage() {
    if (imagemBase64) return `data:image/png;base64, ${imagemBase64}`

    return notFoundImage
  }

  function _addItemProduct() {
    addItemProduct(product)

    toast({
      description: `Item ${nome} adicionado(a) com sucesso!`,
      status: 'success',
      duration: 2000
    })
  }

  function _removeItemProduct() {
    removeItemProduct(product)

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
      w='full'
      overflow="hidden"
    >
      <HStack w="full" h="15%" px={3} spacing={3}>
        <Text
          w="100%"
          fontSize="xl"
          fontWeight="medium"
          color="teal"
          overflow="auto"
          whiteSpace="nowrap"
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

      <HStack>
        <Text fontWeight="semibold">Preço unitário:</Text>
        <Text>R$ {valorUnidade}</Text>
      </HStack>
      <HStack>
        <Text fontWeight="semibold">Preço total por item:</Text>
        <Text>R$ {quantity * parseFloat(valorUnidade)}</Text>
      </HStack>
    </VStack>
  )
}
