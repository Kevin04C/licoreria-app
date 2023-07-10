import { Badge, Box, Link, Td, Tr } from '@chakra-ui/react'
import { useMemo } from 'react'

export const ProductListItem = ({ product }) => {
  const { id, nombre, precio, existencias, categorias, estado } = product
  const { nombre: nombreCategoria } = categorias
  const { activo } = estado
  const statusString = useMemo(() => activo ? 'ACTIVO' : 'INACTIVO', [activo])
  const badgeColor = useMemo(() => activo ? 'green' : 'red', [activo])

  return (
    <Tr>
      <Td>{nombre}</Td>
      <Td>{precio}</Td>
      <Td>{existencias}</Td>
      <Td>{nombreCategoria}</Td>
      <Td>
        <Badge colorScheme={badgeColor} >{statusString}</Badge>
      </Td>
      <Td>
        <Box justifyItems="flex-end" w="100%">
          <Link color="facebook.900" href={`/app/products/${id}`}>EDITAR</Link>
        </Box>
      </Td>
    </Tr>
  )
}
