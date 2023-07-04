import { prisma } from '@/libs/prisma'

export const getCategoryById = async (id) => {
  try {
    const category = await prisma.categorias.findUnique({
      where: {
        id: Number(id)
      },
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
    console.log(category)
    return category
  } catch (error) {
    return null
  } finally {
    prisma.$disconnect()
  }
}
