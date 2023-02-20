import { CircularProgress, CircularProgressLabel, Flex, useColorModeValue } from "@chakra-ui/react";

export default function Sale() {
  return (
    <Flex
      minH={'calc(100vh - 200px)'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <CircularProgress isIndeterminate color='teal' size={20}>
        <CircularProgressLabel fontSize={12}>40%</CircularProgressLabel>
      </CircularProgress>
    </Flex>
  )
}