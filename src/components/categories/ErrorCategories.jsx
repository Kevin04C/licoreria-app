import { Flex, Text } from '@chakra-ui/react'
import { BiErrorAlt } from 'react-icons/bi'

export const ErrorCategories = ({ message }) => {
  return (
    <Flex alignItems="center" color="red.500" gap={2} p={5}>
      <BiErrorAlt />
      <Text fontWeight="semibold">{message}</Text>
    </Flex>
  )
}
