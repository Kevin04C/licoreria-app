import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { useEffect, useMemo } from 'react'
import { Select } from 'chakra-react-select'
import { AiOutlineSearch } from 'react-icons/ai'
import { ProductList, ProductsPagination } from '.'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useProductStore } from '@/store/products'
import { shallow } from 'zustand/shallow'
import { useDebounce } from '@/hooks'

const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 1, label: 'Inacativos' },
  { value: 2, label: 'Activos' }
]

export const FilterProducts = ({ categories = [] }) => {
  const { debounce } = useDebounce()
  const { getProducts, products, currentPage } = useProductStore(
    (state) => ({
      getProducts: state.getProducts,
      products: state.products,
      currentPage: state.currentPage
    }),
    shallow
  )

  const { control } = useForm()

  const [searchProductWatch, statusWatch, categoriesWatch] = useWatch({
    control,
    name: ['searchProduct', 'status', 'categories'],
    defaultValue: ''
  })

  const categoriesOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.nombre
      })),
    [categories]
  )

  useEffect(() => {
    debounce(() => {
      getProducts({ q: searchProductWatch })
    }, 700)
  }, [searchProductWatch])

  useEffect(() => {
    const statusValue = statusWatch?.value ?? ''
    const categoriesValues = categoriesWatch?.map((category) => category.value)

    getProducts({
      q: searchProductWatch,
      status: statusValue,
      categories: categoriesValues
    })
  }, [currentPage, statusWatch, categoriesWatch])

  return (
    <>
      <Box bgColor="white" p={5} shadow="base" rounded="lg" mb={5}>
        <Box mb={5}>
          <Grid templateColumns="repeat(12, 1fr)" gap={5} mb={4}>
            <GridItem colSpan={8}>
              <FormControl>
                <FormLabel color="gray.400" fontSize="14px">
                  Nombre del Producto
                </FormLabel>
                <Controller
                  name="searchProduct"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputGroup>
                      <InputLeftElement color="gray.400">
                        <AiOutlineSearch size={20} />
                      </InputLeftElement>
                      <Input placeholder="Nombre del producto" {...field} />
                    </InputGroup>
                  )}
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl>
                <FormLabel color="gray.400" fontSize="14px">
                  Estado
                </FormLabel>
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      placeholder="Estado"
                      options={statusOptions}
                      defaultValue={statusOptions[0]}
                      {...field}
                    />
                  )}
                />
              </FormControl>
            </GridItem>
          </Grid>
          <Box>
            <Controller
              name="categories"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  placeholder="Categorias"
                  options={categoriesOptions}
                  isMulti
                  {...field}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
      <Box mb={5}>
        <ProductsPagination />
      </Box>
      <Box bgColor="white" p={5} shadow="md" rounded="lg" mb={5}>
        <ProductList products={products} />
      </Box>
    </>
  )
}
