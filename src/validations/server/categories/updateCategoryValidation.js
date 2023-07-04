import * as z from 'zod'

export const updateCategorySchema = z.object({
  nombre: z.string(),
  activo: z.boolean({ required_error: 'La propiedad activo es requerida' })
})
