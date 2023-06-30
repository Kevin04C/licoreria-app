import { prisma } from '@/libs/prisma'
import { matchPassword } from '@/utils'

export const findUser = async ({ username, password }) => {
  try {
    const user = await prisma.usuarios.findFirst({
      where: {
        nombre_usuario: username
      }
    })
    if (!user) return null
    const mathPassword = matchPassword(password, user.contrasena)
    if (!mathPassword) return null
    delete user.contrasena
    return user
  } catch (error) {
    return null
  } finally {
    prisma.$disconnect()
  }
}
