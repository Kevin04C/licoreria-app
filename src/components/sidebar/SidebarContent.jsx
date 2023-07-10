import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { Logout, MenuAccordion, NavItem } from '.'
import {
  AiOutlineAppstoreAdd,
  AiOutlineHome,
  AiOutlineShopping
} from 'react-icons/ai'
import { TbCategory } from 'react-icons/tb'
import { FiShoppingCart } from 'react-icons/fi'
import { MdLiquor } from 'react-icons/md'
import { FaShoppingBasket } from 'react-icons/fa'

export const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w="260px"
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
      <Divider orientation="horizontal" mb={6} />
      <Flex mx="4" flexDirection="column" gap={3}>
        <NavItem icon={AiOutlineHome} href="/app">
          Página principal
        </NavItem>
        <NavItem icon={TbCategory} href="/app/categories">
          Categorias
        </NavItem>
        <MenuAccordion menuText="Productos" icon={AiOutlineShopping}>
          <NavItem icon={FaShoppingBasket} href="/app/products">
            Listar Productos
          </NavItem>
          <NavItem icon={AiOutlineAppstoreAdd} href="/app/products/new-product">
            Nuevo Producto
          </NavItem>
        </MenuAccordion>
        <NavItem icon={FiShoppingCart} href="/app/sales">
          Ventas
        </NavItem>
        <Logout />
      </Flex>
    </Box>
  )
}
