import { categoriesOptionsSelectAdapter } from '@/adapters/category.adapter'
import { updateGetProductDBAdapter } from '@/adapters/products.adapter'
import { useMemo } from 'react'

export const useEditProduct = ({ product, categories }) => {
  const productToUpdate = useMemo(() => updateGetProductDBAdapter(product), [product])
  const categoriesOptions = useMemo(() => {
    return categoriesOptionsSelectAdapter(categories)
  }, [categories])

  return {
    productToUpdate,
    categoriesOptions
  }
}
