import { Box, Flex, Text } from '@chakra-ui/react'

export const CardHome = ({ text, value, bg }) => {
  return (
    <Box
      backgroundColor={bg}
      color="white"
      rounded="md"
      overflow="hidden"
    >
      <Flex justifyContent="center">
        <Box p={5} textAlign="center">
          <Text fontWeight="black" fontSize="38px">{value}</Text>
          <Text fontSize="16px">{text}</Text>
        </Box>
      </Flex>
    </Box>
  )
}
