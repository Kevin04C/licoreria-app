import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { ProductListItem } from './ProductListItem'

const tableHead = ['Nombre', 'Precio', 'Existencias', 'Categoría', 'Estado', 'Acciones']

export const ProductList = ({ products = [] }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          {tableHead.map((head) => (
            <Th key={head}>{head}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {
          products.map(product => (
            <ProductListItem key={product.id} product={product}/>
          ))
        }
      </Tbody>
    </Table>
  )
}
