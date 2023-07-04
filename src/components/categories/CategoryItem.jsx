import { Td, Tr, Link, Badge, Box } from '@chakra-ui/react'
import React, { useMemo } from 'react'

export const CategoryItem = ({ id, nombre, estado: { activo } }) => {
  const statusArea = useMemo(() => activo ? 'ACTIVO' : 'INACTIVO', [activo])
  const colorStatus = useMemo(() => activo ? 'green' : 'red', [activo])

  return (
    <Tr>
      <Td>{nombre}</Td>
      <Td>
        <Badge colorScheme={colorStatus}>{statusArea}</Badge>
      </Td>
      <Td>
        <Box display="flex" justifyContent="flex-end">
          <Link href={`/app/categories/${id}`} color="blue.600">Editar</Link>
        </Box>
      </Td>
    </Tr>
  )
}
