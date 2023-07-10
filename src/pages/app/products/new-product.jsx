import { getActiveCategories } from '@/actions/categories'
import { DashBoardLayout } from '@/layout'
import { useProductStore } from '@/store/products'
import { newProductSchema } from '@/validations/app/products'
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

const newProductPage = ({ categories }) => {
  const { createProduct, creatingProduct, productCreated } = useProductStore(
    (state) => ({
      createProduct: state.createProduct,
      creatingProduct: state.creatingProduct,
      productCreated: state.productCreated
    }),
    shallow
  )
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    resolver: zodResolver(newProductSchema)
  })
  const toast = useToast()

  const categoriesOptions = useMemo(() => {
    return categories.map((category) => ({
      value: category.id,
      label: category.nombre
    }))
  }, [categories])

  const onSubmit = (data) => {
    createProduct(data)
  }

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

  useEffect(() => {
    if (productCreated) {
      toast({
        title: 'Producto creada.',
        description: 'El nuevo producto se ha creado correctamente.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
      reset()
    }
  }, [productCreated])

  return (
    <DashBoardLayout>
      <Heading size="lg" color="facebook.900" mb={5}>
        Nuevo Producto
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
            isLoading={creatingProduct}
            disabled={creatingProduct}
          >
            NUEVO PRODUCTO
          </Button>
        </form>
      </Box>
    </DashBoardLayout>
  )
}

export default newProductPage

export const getServerSideProps = async (ctx) => {
  const categories = await getActiveCategories()
  return {
    props: {
      categories
    }
  }
}
