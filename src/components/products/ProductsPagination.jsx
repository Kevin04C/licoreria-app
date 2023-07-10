import { useProductStore } from '@/store/products'
import { Pagination } from '@/ui/pagination'
import { Box, Flex, Text } from '@chakra-ui/react'
import { shallow } from 'zustand/shallow'

export const ProductsPagination = () => {
  const { totalPagesProducts, totalProducts, to, from, setCurrentPage } =
    useProductStore(
      (state) => ({
        totalPagesProducts: state.totalPagesProducts,
        totalProducts: state.totalProducts,
        to: state.to,
        from: state.from,
        setCurrentPage: state.setCurrentPage
      }),
      shallow
    )

  const handleNextPage = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="gray.800" fontWeight="semibold" mb={2}>
          Viendo <b>{from}</b> - <b>{to}</b> de <b>{totalProducts} </b>Productos
        </Text>
        <Pagination
          pageCount={totalPagesProducts}
          handleNextPage={handleNextPage}
        />
      </Flex>
    </Box>
  )
}
