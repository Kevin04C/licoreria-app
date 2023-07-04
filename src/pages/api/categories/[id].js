import { prisma } from '@/libs/prisma'
import { updateCategorySchema } from '@/validations/server/categories'

export default function handler (req, res) {
  switch (req.method) {
    case 'PUT':
      updateCategory(req, res)
      break
    default:
      res.status(200).json({ mesasage: 'Endpoint no permitido' })
      break
  }
}

const updateCategory = async (req, res) => {
  const id = req.query.id
  const response = updateCategorySchema.safeParse(req.body)
  if (!response.success) {
    const { errors } = response.error
    return res.status(400).json({
      error: { message: 'Péticion invalida', errors }
    })
  }
  try {
    const categoryExists = await prisma.categorias.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!categoryExists) {
      res.status(404).json({ message: 'Categoria no encontrada' })
      return
    }
    const { nombre, activo } = response.data

    const categoryUpdated = await prisma.categorias.update({
      where: {
        id: Number(id)
      },
      data: {
        nombre,
        estado_id: activo ? 2 : 1
      }
    })
    res.status(200).json(categoryUpdated)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error al actualizar la categoria' })
  } finally {
    prisma.$disconnect()
  }
}
