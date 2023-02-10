import { ReactNode } from 'react'
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useColorModeValue,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import MyDrawer from '../Drawer'
import Cart from '../cart/Cart'
import ResumeCartFooter from '../cart/ResumeCartFooter'
// import Cart from '../products/ordered/Cart'
// import ResumeFooter from '../products/ordered/ResumeFooter'

const Links = [
  {
    label: 'Principal',
    route: '/'
  },
  {
    label: 'Criar cliente',
    route: '/customer/create'
  },
  {
    label: 'Sair',
    route: '/login'
  }
]

const NavLink = (props: { children: ReactNode; router: string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700')
    }}
    href={props.router}
  >
    {props.children}
  </Link>
)

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenSidePaneDrawer, onToggle: onToggleSidepaneDrawer } =
    useDisclosure()

  return (
    <>
      <Box as="header" bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link, index) => (
                <NavLink key={index} router={link.route}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              onClick={onToggleSidepaneDrawer}
            >
              Pedido
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} router={link.route}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <MyDrawer
        isOpen={isOpenSidePaneDrawer}
        onToggle={onToggleSidepaneDrawer}
        drawerHeader="Pedido"
        drawerBody={<Cart onToggleSidepaneDrawer={onToggleSidepaneDrawer} />}
        drawerFooter={<ResumeCartFooter onToggleSidepaneDrawer={onToggleSidepaneDrawer} />}
      />
    </>
  )
}
