import * as z from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty('El usuario es requerido'),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe de tener mínimo 6 caracteres' })
    .nonempty({ message: 'La contraseña es requerida' })
})
