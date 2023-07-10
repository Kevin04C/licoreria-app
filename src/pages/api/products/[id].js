import { prisma } from '@/libs/prisma'
import { updateProductSchema } from '@/validations/server/products'

export default function handler (req, res) {
  switch (req.method) {
    case 'PUT':
      updateProduct(req, res)
      break
    default:
      res.status(400).json({ message: 'Método no permitido' })
      break
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.query

  const response = updateProductSchema.safeParse(req.body)
  if (!response.success) {
    const { issues } = response.error
    return res.status(400).json({ message: 'Datos inválidos', errors: issues })
  }
  try {
    const productExists = await prisma.productos.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!productExists) {
      res.status(400).json({ message: 'El producto ya existe' })
      return
    }
    const { name, price, stock, active, categoryId } = response.data

    const productUpdated = await prisma.productos.update({
      where: {
        id: Number(id)
      },
      data: {
        nombre: name,
        precio: price,
        existencias: stock,
        estado_id: active ? 2 : 1,
        categoria_id: categoryId
      }
    })

    res.status(200).json({ products: productUpdated })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error al actualizar el producto' })
  } finally {
    await prisma.$disconnect()
  }
}
