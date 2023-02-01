import { CheckIcon, Search2Icon } from '@chakra-ui/icons'
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack
} from '@chakra-ui/react'
import Logged from './components/layouts/Logged'

export default function App() {
  return (
    <Logged>
      <VStack alignItems="stretch" spacing={4} maxWidth="100%" height="100vh">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Produto"
            onChange={(e) => e.target.value}
          />
          <InputRightElement mr={2}>
            <Button
              colorScheme="teal"
              h="1.75rem"
              size="sm"
              onClick={() => ({})}
            >
              <CheckIcon color="white" />
            </Button>
          </InputRightElement>
        </InputGroup>

        {/* {filteredProducts.map((product, index) => {
          return (
            <CardProductResume
              key={index}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
            />
          )
        })} */}
      </VStack>
    </Logged>
  )
}
