import { prisma } from '@/libs/prisma'
import { encryptPassword } from '@/utils'

const USER = {
  nombre_usuario: 'admin',
  correo: 'admin@gmail.com',
  contrasena: '123456'
}

export default async function (req, res) {
  if (process.env.NODE_ENV !== 'development') return
  try {
    const userExists = await prisma.usuarios.findUnique({
      where: {
        id: 1
      }
    })

    if (userExists) {
      res.status(400).json({ message: 'El usuario ya existe' })
      return
    }

    const passwordEncrypted = encryptPassword(USER.contrasena)
    const user = await prisma.usuarios.create({
      data: {
        nombre_usuario: USER.nombre_usuario,
        correo: USER.correo,
        contrasena: passwordEncrypted
      }
    })
    res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error al crear el usuario' })
  } finally {
    prisma.$disconnect()
  }
}
