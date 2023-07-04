import { prisma } from '@/libs/prisma'

export const getCategories = async () => {
  try {
    const categories = await prisma.categorias.findMany({
      select: {
        id: true,
        nombre: true,
        estado: {
          select: {
            activo: true
          }
        }
      }
    })
    return categories
  } catch (error) {
    return null
  } finally {
    prisma.$disconnect()
  }
}
