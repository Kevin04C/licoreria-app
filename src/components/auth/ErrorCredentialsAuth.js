import { Box, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdOutlineErrorOutline } from 'react-icons/md'

export const ErrorCredentialsAuth = () => {
  const { query } = useRouter()
  if (!query.error) return null
  return (
    <Box px={2} py={3} rounded="md" backgroundColor="red.100" border="1px" borderColor="red.500">
      <Flex gap={2} alignItems="center" color="red.700">
        <MdOutlineErrorOutline size={25}/>
        <Text fontWeight="semibold">Usuario o contraseña incorrectos</Text>
      </Flex>
    </Box>
  )
}
