import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'
import { ReactNode } from 'react'
import Header from './Header'

const Logged = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Box minH={'100vh'} px={4} py={2} bg={useColorModeValue('gray.50', 'gray.800')}>
        {children}
      </Box>
    </>
  )
}

export default Logged
