import { useDebounce } from '@/hooks'
import { useCategoriesStore } from '@/store/categories/'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { BiSearchAlt } from 'react-icons/bi'
import { CategoriesList } from './CategoriesList'

export const FilterCategories = () => {
  const { control } = useForm()
  const searchCategoryWatch = useWatch({ control, name: 'searchCategory', defaultValue: '' })
  const { debounce } = useDebounce()
  const { getCategories, categories, errorCategories } = useCategoriesStore((state) => ({
    getCategories: state.getCategories,
    categories: state.categories,
    errorCategories: state.errorCategories
  }))

  useEffect(() => {
    debounce(() => {
      getCategories({ q: searchCategoryWatch })
    }, 500)
  }, [searchCategoryWatch])

  return (
    <Box>
      <Box backgroundColor="white" p={5}>
        <form>
          <FormControl>
            <Box>
              <FormLabel color="gray.400" fontSize="14px">
                Nombre de la categoría
              </FormLabel>
              <Controller
                name="searchCategory"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputGroup>
                    <InputLeftElement color="facebook.700">
                      <BiSearchAlt size={20} />
                    </InputLeftElement>
                    <Input
                      type="search"
                      placeholder=""
                      {...field}
                      autoComplete="off"
                    />
                  </InputGroup>
                )}
              />
            </Box>
          </FormControl>
        </form>
      </Box>
      <CategoriesList
        categories={categories}
        hasError={errorCategories}
      />
    </Box>
  )
}
