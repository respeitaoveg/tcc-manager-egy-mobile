import { ReactNode } from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter
} from '@chakra-ui/react'

export default function MyDrawer(props: {
  isOpen: boolean
  onToggle(): void
  drawerHeader: string
  drawerBody: ReactNode
  drawerFooter?: ReactNode
}) {
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      size="md"
      onClose={() => props.onToggle()}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{props.drawerHeader}</DrawerHeader>

        <DrawerBody>{props.drawerBody}</DrawerBody>

        <DrawerFooter>{props.drawerFooter}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
