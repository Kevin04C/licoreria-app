import { Box, Divider, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { Logout, NavItem } from '.'
import { AiOutlineHome, AiOutlineShopping } from 'react-icons/ai'
import { TbCategory } from 'react-icons/tb'
import { FiShoppingCart } from 'react-icons/fi'
import { MdLiquor } from 'react-icons/md'

export const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={60}
      pos="fixed"
      h="full"
      shadow="xl"
      {...rest}
    >
      <Box mb={4} px={4} my={5}>
        <Box>
          <Flex gap={2} alignItems="center">
            <Icon as={MdLiquor} color="facebook.900" />
            <Text fontSize="lg" fontWeight="bold" color="facebook.900">
              LICORERÍA LUVILLA
            </Text>
          </Flex>
        </Box>
      </Box>
      <Divider orientation='horizontal' mb={6}/>
      <Flex mx="4" flexDirection="column" gap={3}>
        <NavItem icon={AiOutlineHome} href='/app'>Página principal</NavItem>
        <NavItem icon={AiOutlineShopping} href="/app/products">
          Productos
        </NavItem>
        <NavItem icon={TbCategory} href='/app/categories'>Categorias</NavItem>
        <NavItem icon={FiShoppingCart} href='/app/sales'>Ventas</NavItem>
        <Logout />
      </Flex>
    </Box>
  )
}
