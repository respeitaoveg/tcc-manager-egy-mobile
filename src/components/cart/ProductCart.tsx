import { DeleteIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack
} from '@chakra-ui/react'
import { product } from '../../types/api'

interface ProductCartProps {
  product: product
  quantity: number
  removeProduct(product: product): void
}

export default function ProductCart({ product, quantity, removeProduct }: ProductCartProps) {
  return (
    <VStack w='full' align="start" spacing={2}>
      <HStack w='full' placeItems='flex-start'>
        <Image
          m={2}
          boxSize={75}
          borderRadius="lg"
          width="25%"
          maxW= '100px'
          objectFit="cover"
          src={`data:image/png;base64, ${product.imagemBase64}`}
          alt={product.nome}
        />
        <Box w='75%'>
          <HStack justify="space-between">
            <Text w='80%' fontSize="lg" fontWeight="bold" overflow='auto' whiteSpace='nowrap'>
              {product.nome}
            </Text>
            <Button
              w='20%'
              colorScheme="red"
              variant="ghost"
              onClick={() => removeProduct(product)}
            >
              <DeleteIcon color="red" />
            </Button>
          </HStack>
          <Text fontSize="sm" align="justify">
            {product.descricao}
          </Text>
        </Box>
      </HStack>
      <HStack spacing={4} alignItems="end">
        <Text fontWeight="semibold">Quantidade:</Text>
        <Text>{quantity}</Text>
      </HStack>
      <HStack>
        <Text fontWeight="semibold">Preço unitário:</Text>
        <Text>R$ {product.valorUnidade}</Text>
      </HStack>
      <HStack>
        <Text fontWeight="semibold">Preço total por item:</Text>
        <Text>R$ {quantity * parseFloat(product.valorUnidade)}</Text>
      </HStack>
    </VStack>
  )
}
