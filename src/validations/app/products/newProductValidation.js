import * as z from 'zod'

export const newProductSchema = z.object({
  name: z.string().nonempty('El nombre es requerido'),
  price: z
    .number({
      required_error: 'El precio es requerido',
      invalid_type_error: 'Las existencias deben ser un numero'
    })
    .positive('El precio debe ser mayor a 0'),
  stock: z
    .number({
      required_error: 'Las existencias son requeridas',
      invalid_type_error: 'Las existencias deben ser un numero'
    })
    .positive('Las existencias deben ser mayor a 0'),
  active: z
    .string({ required_error: 'El estado es requerido' })
    .nonempty('El estado es requerido'),
  category: z
    .object({
      label: z.string(),
      value: z.number()
    })
})
