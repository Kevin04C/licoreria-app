import { getActiveCategories } from '@/actions/categories'
import { getProductById } from '@/actions/products'
import { useEditProduct } from '@/hooks/product'
import { DashBoardLayout } from '@/layout'
import { useProductStore } from '@/store/products'
import { updateProductSchema } from '@/validations/app/products'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select } from 'chakra-react-select'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { shallow } from 'zustand/shallow'

const UpdateProductPage = ({ product, categories }) => {
  const { updatedProduct, updatingProduct, errorUpdateProduct, updateProduct } =
    useProductStore(
      (state) => ({
        updatingProduct: state.updatingProduct,
        updatedProduct: state.updatedProduct,
        errorUpdateProduct: state.errorUpdateProduct,
        updateProduct: state.updateProduct
      }),
      shallow
    )
  const { productToUpdate, categoriesOptions } = useEditProduct({
    product,
    categories
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm({
    values: productToUpdate,
    resolver: zodResolver(updateProductSchema)
  })
  const toast = useToast()

  const {
    invalidName,
    invalidPrice,
    invalidStock,
    invalidCategory,
    invalidActive
  } = useMemo(
    () => ({
      invalidName: errors?.name?.message,
      invalidPrice: errors?.price?.message,
      invalidStock: errors?.stock?.message,
      invalidCategory: errors?.category?.message,
      invalidActive: errors?.active?.message
    }),
    [errors]
  )

  const onSubmit = (data) => {
    const id = getValues('id')
    updateProduct({ id, ...data })
  }

  useEffect(() => {
    if (updatedProduct) {
      toast({
        title: 'Producto actualizado.',
        description: 'El producto se ha actualizado correctamente.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }, [updatedProduct])

  useEffect(() => {
    if (errorUpdateProduct) {
      toast({
        title: 'Error al actualizar producto',
        description: errorUpdateProduct,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }, [errorUpdateProduct])

  return (
    <DashBoardLayout>
      <Heading size="lg" mb={5}>
        Editanto Producto
      </Heading>
      <Box bgColor="white" p={4} rounded="lg" shadow="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={invalidName}>
            <FormLabel color="gray.400" fontSize="14px">
              Nombre
            </FormLabel>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Nombre del producto"
                  {...field}
                  autoComplete="off"
                />
              )}
            />
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={invalidPrice}>
            <FormLabel color="gray.400" fontSize="14px">
              Precio
            </FormLabel>
            <Controller
              name="price"
              control={control}
              defaultValue={'0'}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="Precio"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              )}
            />
            <FormErrorMessage>{errors?.price?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={invalidStock}>
            <FormLabel color="gray.400" fontSize="14px">
              Cantidad existencias
            </FormLabel>
            <Controller
              name="stock"
              control={control}
              defaultValue={'0'}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="Precio"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              )}
            />
            <FormErrorMessage>{errors?.stock?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4} isInvalid={invalidCategory}>
            <FormLabel color="gray.400" fontSize="14px">
              Categoria
            </FormLabel>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  options={categoriesOptions}
                  placeholder="Categoria"
                  defaultInputValue={productToUpdate.category.laz}
                  {...field}
                />
              )}
            />
            <FormErrorMessage>{errors?.category?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={invalidActive}>
            <FormLabel color="gray.400" fontSize="14px">
              Estado
            </FormLabel>
            <RadioGroup>
              <Controller
                control={control}
                name="active"
                defaultValue="true"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <Stack direction="rows">
                      <Radio value="true">Activo</Radio>
                      <Radio value="false">No Activo</Radio>
                    </Stack>
                  </RadioGroup>
                )}
              />
            </RadioGroup>
            <FormErrorMessage>{errors?.active?.message}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="facebook"
            w="100%"
            type="submit"
            isLoading={updatingProduct}
            disabled={updatingProduct}
          >
            NUEVO PRODUCTO
          </Button>
        </form>
      </Box>
    </DashBoardLayout>
  )
}

export default UpdateProductPage

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const product = await getProductById(id)
  const categories = await getActiveCategories()

  if (!product || !categories) {
    return {
      redirect: {
        destination: '/app/products',
        permanent: false
      }
    }
  }

  return {
    props: {
      product,
      categories
    }
  }
}
