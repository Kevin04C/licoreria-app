import * as z from 'zod'

export const updateProductSchema = z.object({
  name: z.string().nonempty('El nombre es requerido'),
  price: z
    .number({
      required_error: 'El precio es requerido',
      invalid_type_error: 'El precio debe ser un número'
    })
    .positive('El precio debe ser mayor a 0'),
  stock: z
    .number({
      required_error: 'Las existencias son requerido',
      invalid_type_error: 'Las existencias deben ser un número'
    })
    .positive('El stock debe ser mayor a 0'),
  active: z.string().nonempty('El estado es requerido'),
  category: z.object({
    value: z.number(),
    label: z.string()
  })
})
