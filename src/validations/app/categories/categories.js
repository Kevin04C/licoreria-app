import * as z from 'zod'

export const newCategorySchema = z.object({
  name: z.string().nonempty('El nombre es requerido'),
  status: z.string().nonempty('El estado es requerido')
})

export const updateCategorySchema = z.object({
  id: z.number({ required_error: 'El id es requerido' }),
  nombre: z.string().nonempty('El nombre es requerido'),
  estado: z.object({
    activo: z.string().nonempty('La propiedad activo es requerida')
  }).required('El estado es requerido')
})
