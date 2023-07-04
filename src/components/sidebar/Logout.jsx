import { Button } from '@chakra-ui/react'
import { IoExitOutline } from 'react-icons/io5'
import { signOut } from 'next-auth/react'

export const Logout = () => {
  const handleLogout = () => {
    signOut()
  }

  return (
    <Button
      leftIcon={<IoExitOutline />}
      colorScheme="red"
      w="full"
      variant="ghost"
      p={3}
      justifyContent="flex-start"
      onClick={handleLogout}
    >
      Cerrar sesión
    </Button>
  )
}
