import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
} from "@chakra-ui/react";
import { product } from "../../types/api";


export default function ProductCart(props: {product: any, handleRemoveProduct(product: product): void}) {
  return (
    <VStack align="start">
      <Box>
        <Box float="left" pr={2}>
          <Image
            boxSize={75}
            borderRadius="lg"
            objectFit="cover"
            src={props.product.imageUrl}
            alt={props.product.name}
          />
        </Box>
        <Box>
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="bold">
              {props.product.name}
            </Text>
            <Button colorScheme="red" variant="ghost" onClick={() => props.handleRemoveProduct(props.product.id)}>
              <DeleteIcon color="red" />
            </Button>
          </HStack>
          <Text fontSize='sm' align="justify">
            {props.product.description}
          </Text>
        </Box>
      </Box>

      <VStack spacing={2} align="start">
        <HStack spacing={4} alignItems='end'>
          <Text fontWeight="semibold">Quantidade:</Text>
          <NumberInput size='sm' maxW={20} defaultValue={1} min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <Text fontWeight="semibold">Preço unitário:</Text>
          <Text>R$ {props.product.price}</Text>
        </HStack>
        <HStack>
          <Text fontWeight="semibold">Preço total por item:</Text>
          <Text>R$ {props.product.quantity * props.product.price}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
