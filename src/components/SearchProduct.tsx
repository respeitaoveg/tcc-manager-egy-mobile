import { Search2Icon, CheckIcon } from '@chakra-ui/icons'
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button
} from '@chakra-ui/react'
import { useState } from 'react'

interface searchProductProps {
  getProducts(search: string): void
}

export default function SearchProduct({ getProducts }: searchProductProps) {
  const [search, setSearch] = useState('')

  function searchProduct() {
    getProducts(search)
  }
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Produto"
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputRightElement mr={2}>
        <Button colorScheme="teal" h="1.75rem" size="sm" onClick={searchProduct}>
          <CheckIcon color="white" />
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
