import { getCategoryById } from '@/actions/categories'
import { DashBoardLayout } from '@/layout'
import { useCategoriesStore } from '@/store/categories'
import { updateCategorySchema } from '@/validations/app/categories'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

const EditCategoryPage = ({ category }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...category,
      estado: {
        activo: category.estado.activo.toString()
      }
    },
    resolver: zodResolver(updateCategorySchema)
  })
  const { isInvalidNombre, isInvalidActivo } = useMemo(
    () => ({
      isInvalidNombre: errors?.nombre?.message !== undefined,
      isInvalidActivo: errors?.estado?.activo?.message !== undefined
    }),
    [errors]
  )

  const {
    updatingCategory,
    categoryUpdated,
    errorCategoryUpdate,
    updateCategory
  } = useCategoriesStore((state) => ({
    updatingCategory: state.updatingCategory,
    categoryUpdated: state.categoryUpdated,
    errorCategoryUpdate: state.errorCategoryUpdate,
    updateCategory: state.updateCategory
  }))
  const toast = useToast()

  const onSubmit = (data) => {
    updateCategory(data)
  }

  useEffect(() => {
    if (categoryUpdated) {
      toast({
        title: 'Categoria actualizada.',
        description: 'La categoria se ha actualizado correctamente.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }, [categoryUpdated])

  useEffect(() => {
    if (errorCategoryUpdate) {
      toast({
        title: 'Error al actualizar la categoria.',
        description: errorCategoryUpdate,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }, [errorCategoryUpdate])

  return (
    <DashBoardLayout>
      <Text fontSize={25} fontWeight="bold" color="facebook.900" mb={5}>
        Editando categoria
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box backgroundColor="white" shadow="md" rounded="lg" p={5}>
          <FormControl mb={5} isInvalid={isInvalidNombre}>
            <FormLabel color="gray.400">Category</FormLabel>
            <Controller
              control={control}
              name="nombre"
              defaultValue=""
              render={({ field }) => (
                <Input type="text" {...field} autoComplete="off" />
              )}
            />
            <FormErrorMessage>{errors?.nombre?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={8} isInvalid={isInvalidActivo}>
            <FormLabel color="gray.400">Estado</FormLabel>
            <Controller
              name="estado.activo"
              control={control}
              render={({ field: { value, ...rest } }) => (
                <RadioGroup value={value} {...rest}>
                  <Stack direction="row">
                    <Radio value="false">No Activo</Radio>
                    <Radio value="true">Activo</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>
              {errors?.estado?.activo.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            w="full"
            colorScheme="facebook"
            type="submit"
            isLoading={updatingCategory}
          >
            ACTUALIZAR
          </Button>
        </Box>
      </form>
    </DashBoardLayout>
  )
}

export default EditCategoryPage

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id
  const category = await getCategoryById(id)

  return {
    props: {
      category
    }
  }
}
