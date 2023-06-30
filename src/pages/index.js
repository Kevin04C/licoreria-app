import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/validations'
import { useMemo } from 'react'
import { getSession, signIn } from 'next-auth/react'

export default function Home () {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    await signIn('credentials', { username: data.username, password: data.password, callbackUrl: '/app' })
  }

  const isInvalidUsername = useMemo(() => errors.username?.message !== undefined, [errors.username])
  const isInvalidPassword = useMemo(() => errors.password?.message !== undefined, [errors.password])

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
              <Heading mb={4} color="facebook.800">
                Iniciar sesión
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={3} isInvalid={isInvalidUsername}>
                  <FormLabel color="gray.500">Nombre de usuario</FormLabel>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputGroup>
                        <InputLeftElement pointerEvents="none" color="gray.300">
                          <FaUserAlt />
                        </InputLeftElement>
                        <Input
                          type="text"
                          placeholder="Usuario"
                          {...field}
                          autoComplete="off"
                        />
                      </InputGroup>
                    )}
                  />
                  <FormErrorMessage>
                    {errors.username?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl mb={5} isInvalid={isInvalidPassword}>
                  <FormLabel color="gray.500">Contraseña</FormLabel>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <InputGroup>
                        <InputLeftElement pointerEvents="none" color="gray.300">
                          <FaLock />
                        </InputLeftElement>
                        <Input
                          type="password"
                          placeholder="contraseña"
                          {...field}
                        />
                      </InputGroup>
                    )}
                  />
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                <Button type="submit" w="full" colorScheme="facebook">
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

export const getServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    }
  }
  return {
    props: { }
  }
}
