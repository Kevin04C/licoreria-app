import * as z from 'zod'

export const newCategorySchema = z.object({
  name: z.string().nonempty('El nombre es requerido'),
  status: z.string().nonempty('El estado es requerido')
})
