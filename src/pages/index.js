import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from '@chakra-ui/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'

export default function Home () {
  return (
    <>
      <main>
        <Flex
          backgroundColor="gray.50"
          alignItems="center"
          justifyContent="center"
          width="100vw"
          height="100vh"
          flexDirection="column"
        >
          <Box maxW="500px" w="90%">
            <Stack
              backgroundColor="whiteAlpha.900"
              shadow="md"
              spacing={4}
              p="1.5rem"
            >
              <Heading mb={4} color="facebook.800">Iniciar sesión</Heading>
              <form>
                <FormControl mb={3}>
                  <FormLabel color="gray.500">Nombre de usuario</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <FaUserAlt />
                    </InputLeftElement>
                    <Input type="text" placeholder='Usuario'/>
                  </InputGroup>
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel color="gray.500">Contraseña</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" color="gray.300">
                      <FaLock />
                    </InputLeftElement>
                    <Input type="password" placeholder='contraseña'/>
                  </InputGroup>
                </FormControl>
                <Button type="submit" w="full" colorScheme='facebook'>
                  INICIAR SESIÓN
                </Button>
              </form>
            </Stack>
          </Box>
        </Flex>
      </main>
    </>
  )
}
