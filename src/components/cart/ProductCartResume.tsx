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

export default function ProductCartResume(props: {
  name: string
  description: string
  price: number
  image: string
  quantity: number
}) {
  const toast = useToast()

  function addProduct() {
    toast({
      description: `${props.name} adicionado(a) com sucesso!`,
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
        src={props.image}
        alt={`Picture of ${props.name}`}
      />

      <VStack alignItems="start" width="60%">
        <Text fontSize="xl">{props.name}</Text>
        <Text fontSize="sm">{props.description}</Text>
        <HStack>
          <Text fontWeight="semibold">Preço:</Text>
          <Text>R$ {props.price}</Text>
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
          {props.quantity}
        </Text>
      </Flex>
    </HStack>
  )
}
