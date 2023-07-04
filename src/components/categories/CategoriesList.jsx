import {
  Divider,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { CategoryItem } from './CategoryItem'
import { ErrorCategories } from '.'

export const CategoriesList = ({ categories = [], hasError }) => {
  return (
    <TableContainer backgroundColor="white" shadow="lg" rounded="md">
      <Divider />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>NOMBRE</Th>
            <Th>ESTADO</Th>
            <Th>ACCIONES</Th>
          </Tr>
        </Thead>
        <Tbody>
          {hasError
            ? <ErrorCategories message={hasError}/>
            : (
                categories.map((category) => (
                   <CategoryItem key={category.id} {...category} />
                ))
              )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
