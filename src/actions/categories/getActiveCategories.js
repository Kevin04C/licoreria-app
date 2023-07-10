import { prisma } from '@/libs/prisma'

export const getActiveCategories = async () => {
  try {
    const categories = await prisma.categorias.findMany({
      where: {
        estado: {
          activo: true
        }
      }
    })
    return categories
  } catch (error) {
    return null
  } finally {
    await prisma.$disconnect()
  }
}
