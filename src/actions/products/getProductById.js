import { prisma } from '@/libs/prisma'

export const getProductById = async (id) => {
  try {
    const product = await prisma.productos.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        nombre: true,
        precio: true,
        existencias: true,
        categorias: {
          select: {
            id: true,
            nombre: true
          }
        },
        estado: {
          select: {
            activo: true
          }
        }
      }
    })
    return JSON.parse(JSON.stringify(product))
  } catch (error) {
    return null
  } finally {
    await prisma.$disconnect()
  }
}
