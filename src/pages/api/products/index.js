import { prisma } from '@/libs/prisma'
import { pagination } from '@/utils'
import { newProductSchema } from '@/validations/server/products'

export default function handler (req, res) {
  switch (req.method) {
    case 'GET':
      getProducts(req, res)
      break
    case 'POST':
      newProduct(req, res)
      break
    default:
      res.status(200).json({ message: 'Método no permitido' })
      break
  }
}

export const getProducts = async (req, res) => {
  const PRODUCTS_PER_PAGE = 20
  const { page, q = '', status, categories } = req.query

  const { take, skip } = pagination({ page, take: PRODUCTS_PER_PAGE })
  const statusAsNumber = status ? Number(status) : undefined
  const categoriesAsArray =
    categories && JSON.parse(categories).length > 0
      ? JSON.parse(categories)
      : undefined

  try {
    const totalProducts = await prisma.productos.count({
      where: {
        nombre: {
          contains: q
        },
        estado_id: {
          equals: statusAsNumber
        },
        categoria_id: {
          in: categoriesAsArray
        }
      }
    })

    const products = await prisma.productos.findMany({
      select: {
        id: true,
        nombre: true,
        precio: true,
        existencias: true,
        categorias: {
          select: {
            nombre: true
          }
        },
        estado: {
          select: {
            activo: true
          }
        }
      },
      where: {
        nombre: {
          contains: q
        },
        estado_id: {
          equals: statusAsNumber
        },
        categoria_id: {
          in: categoriesAsArray
        }
      },
      skip,
      take
    })

    const from = skip + 1
    const to = skip + products.length
    const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE)

    res.status(200).json({
      totalPages,
      from,
      to,
      totalProducts,
      products
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error al obtener los productos' })
  } finally {
    await prisma.$disconnect()
  }
}

export const newProduct = async (req, res) => {
  const response = newProductSchema.safeParse(req.body)
  if (!response.success) {
    const { issues } = response.error
    return res.status(400).json({ message: 'Datos inválidos', errors: issues })
  }

  try {
    const { name, price, active, categoryId, stock } = response.data
    const productsExists = await prisma.productos.findFirst({
      where: {
        nombre: {
          equals: name
        }
      }
    })
    if (productsExists) {
      res.status(400).json({ message: `Ya existe un producto con el nombre ${name}` })
      return
    }

    const product = await prisma.productos.create({
      data: {
        nombre: name,
        precio: price,
        existencias: stock,
        estado_id: active ? 2 : 1,
        categoria_id: categoryId
      }
    })

    res.status(200).json({ product })
  } catch (error) {
    res.status(200).json({ message: 'Error al crear el producto' })
  } finally {
    await prisma.$disconnect()
  }
}
