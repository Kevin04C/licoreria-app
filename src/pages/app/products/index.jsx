import { DashBoardLayout } from '@/layout'
import { getCategories } from '@/actions/categories'
import { FilterProducts } from '@/components/products'
import { Box, Heading } from '@chakra-ui/react'

const ProductsPage = ({ categories = [] }) => {
  return (
    <DashBoardLayout>
      <Box position="relative" w="100%">
        <Heading color="facebook.900" size="lg" mb={5}>
          LISTANDO TODOS LOS PRODUCTOS
        </Heading>
        <FilterProducts categories={categories} />
      </Box>
    </DashBoardLayout>
  )
}

export default ProductsPage

export const getServerSideProps = async (ctx) => {
  const categories = await getCategories()

  return {
    props: {
      categories
    }
  }
}
