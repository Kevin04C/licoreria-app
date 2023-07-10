import * as z from 'zod'

export const newProductSchema = z.object({
  name: z.string().nonempty('El nombre es requerido'),
  price: z.number().positive('El precio debe ser mayor a 0'),
  stock: z.number().positive('Las existencias deben ser mayor a 0'),
  active: z.boolean({ required_error: 'El estado es requerido' }),
  categoryId: z.number({ required_error: 'La categoria es requerida' })
})
