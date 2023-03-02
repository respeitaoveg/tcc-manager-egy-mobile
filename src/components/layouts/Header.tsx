import { ReactNode, useContext } from 'react'
import {
  Box,
  Flex,
  HStack,
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
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

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
    route: '/login',
    isLogout: true
  }
]

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenSidePaneDrawer, onToggle: onToggleSidepaneDrawer } =
    useDisclosure()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const NavLink = (props: { children: ReactNode, router: string, isLogout?: boolean }) => {
    function navigation() {
      if (props.isLogout) logout()

      onClose()
      navigate(props.router)
    }
    return (
      <Button
        px={2}
        py={1}
        rounded={'md'}
        fontWeight={400}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700')
        }}
        onClick={navigation}
      >
        {props.children}
      </Button>
    )
  }


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
            <Link to='/'>EGY</Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link, index) => (
                <NavLink key={index} router={link.route} isLogout={link.isLogout}>
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
                <NavLink key={index} router={link.route} isLogout={link.isLogout}>
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
