import {
  newProductAdapter,
  updateProductAdapter
} from '@/adapters/products.adapter'
import { licoreriaApi } from '@/api'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useProductStore = create(
  devtools((set, get) => ({
    currentPage: 1,
    products: [],
    loadingProducts: false,
    totalProducts: 0,
    totalPagesProducts: 0,
    from: 0,
    to: 0,
    errorGetProducts: null,
    productCreated: false,
    errorCreateProduct: null,
    creatingProduct: false,
    updatingProduct: false,
    updatedProduct: false,
    errorUpdateProduct: null,
    getProducts: async ({ q = '', status = '', categories }) => {
      set(() => ({ loadingProducts: true }))
      const { currentPage } = get()
      try {
        const { data } = await licoreriaApi.get('/products', {
          params: {
            page: currentPage,
            q,
            status,
            categories: JSON.stringify(categories)
          }
        })
        const { products, totalProducts, from, to, totalPages } = data
        set(() => ({
          products,
          totalPagesProducts: totalPages,
          totalProducts,
          to,
          from
        }))
      } catch (error) {
        const { message } = error?.response?.data
        set(() => ({ errorGetProducts: message }))
        setTimeout(() => set(() => ({ errorGetProducts: null })), 3000)
      } finally {
        set(() => ({ loadingProducts: false }))
      }
    },
    setCurrentPage: (newPage) => {
      set(() => ({ currentPage: newPage }))
    },
    createProduct: async (productForm) => {
      const product = newProductAdapter(productForm)
      set(() => ({
        creatingProduct: true,
        productCreated: false
      }))
      try {
        await licoreriaApi.post('/products', product)
        set(() => ({ productCreated: true }))
      } catch (error) {
        const { message } = error.response?.data
        set(() => ({ errorCreateProduct: message }))
      } finally {
        set(() => ({ creatingProduct: false }))
      }
    },
    updateProduct: async (updateProductForm) => {
      set(() => ({
        updatingProduct: true,
        updatedProduct: false,
        errorUpdateProduct: null
      }))
      try {
        const product = updateProductAdapter(updateProductForm)
        await licoreriaApi.put(`/products/${product.id}`, product)
        set(() => ({ updatedProduct: true }))
      } catch (error) {
        const { message } = error?.response?.data
        set(() => ({ errorUpdateProduct: message }))
      } finally {
        set(() => ({ updatingProduct: false }))
      }
    }
  }))
)
