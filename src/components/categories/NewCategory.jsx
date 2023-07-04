import { useCategoriesStore } from '@/store/categories'
import { newCategorySchema } from '@/validations/app/categories'
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
import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { shallow } from 'zustand/shallow'

export const NewCategory = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(newCategorySchema)
  })
  const {
    createCategory,
    creatingCategory,
    categoryCreated,
    errorCategoryCreate
  } = useCategoriesStore(
    (state) => ({
      createCategory: state.createCategory,
      creatingCategory: state.creatingCategory,
      categoryCreated: state.categoryCreated,
      errorCategoryCreate: state.errorCategoryCreate
    }),
    shallow
  )
  const toast = useToast()

  const onSubmit = (data) => {
    createCategory(data)
  }
  const { invalidName, invalidStatus } = useMemo(() => {
    return {
      invalidName: errors.name?.message,
      invalidStatus: errors.status?.message
    }
  }, [errors])

  useEffect(() => {
    if (categoryCreated) {
      toast({
        title: 'Categoria creada.',
        description: 'La categoria se ha creado correctamente.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }, [categoryCreated])

  useEffect(() => {
    if (errorCategoryCreate) {
      toast({
        title: 'Error al crear la categoria.',
        description: errorCategoryCreate,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }, [errorCategoryCreate])

  return (
    <Box>
      <Heading fontSize={26} fontWeight="black" color="facebook.900" mb={5}>
        Nueva categoría
      </Heading>
      <Box backgroundColor="white" p={5} shadow="base" rounded="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={5} isInvalid={invalidName}>
            <FormLabel htmlFor="name" color="gray.400">
              Nombre categoría
            </FormLabel>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  id="name"
                  placeholder="Nombre categoría"
                  autoComplete="off"
                  {...field}
                />
              )}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={8} isInvalid={invalidStatus}>
            <FormLabel htmlFor="name" color="gray.400">
              Estado de la categoría
            </FormLabel>
            <Controller
              control={control}
              name="status"
              defaultValue=""
              render={({ field }) => (
                <RadioGroup>
                  <Stack direction="row" {...field}>
                    <Radio value="true" defaultChecked>
                      Activo
                    </Radio>
                    <Radio value="false">No Activo</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
            <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
          </FormControl>
          <Button
            w="full"
            colorScheme="facebook"
            type="submit"
            isLoading={creatingCategory}
          >
            CREAR CATEGORIA
          </Button>
        </form>
      </Box>
    </Box>
  )
}
