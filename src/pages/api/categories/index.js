import { prisma } from '@/libs/prisma'
import { newCategorySchema } from '@/validations/app/categories'

export default function (req, res) {
  switch (req.method) {
    case 'GET':
      getCategories(req, res)
      break
    case 'POST':
      createCategory(req, res)
      break
    default:
      res.status(200).json({ mesasage: 'Ruta no permita' })
      break
  }
}

const getCategories = async (req, res) => {
  const { q = '' } = req.query

  try {
    const categories = await prisma.categorias.findMany({
      where: {
        nombre: {
          contains: q
        }
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
    res.status(200).json({ categories })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error al obtener las categorias' })
  } finally {
    await prisma.$disconnect()
  }
}

export const createCategory = async (req, res) => {
  const response = newCategorySchema.safeParse(req.body)
  if (!response.success) {
    const { issues } = response.error
    return res.status(400).json({
      message: 'Datos inválidi',
      errors: issues
    })
  }

  try {
    const { name, status } = response.data
    const categoryExists = await prisma.categorias.findFirst({
      where: {
        nombre: name
      }
    })
    if (categoryExists) {
      return res.status(400).json({ message: 'La categoria ya existe' })
    }

    const newCategory = await prisma.categorias.create({
      data: {
        nombre: name.toLowerCase(),
        estado: {
          create: {
            activo: status === 'true'
          }
        }
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
    res.status(200).json(newCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoria' })
  } finally {
    await prisma.$disconnect()
  }
}
