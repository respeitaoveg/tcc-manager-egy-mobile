import { Search2Icon, CheckIcon } from '@chakra-ui/icons'
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button
} from '@chakra-ui/react'

export default function SearchProduct() {
  return (
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
        <Button colorScheme="teal" h="1.75rem" size="sm" onClick={() => ({})}>
          <CheckIcon color="white" />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
