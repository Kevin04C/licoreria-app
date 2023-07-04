import { updateCategoryAdapter } from '@/adapters/category.adapter'
import { licoreriaApi } from '@/api'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useCategoriesStore = create(
  devtools((set) => ({
    categories: [],
    errorCategories: null,
    creatingCategory: false,
    categoryCreated: false,
    errorCategoryCreate: null,
    updatingCategory: false,
    categoryUpdated: false,
    errorCategoryUpdate: null,
    getCategories: async ({ q = '' }) => {
      try {
        const { data } = await licoreriaApi.get(`/categories?q=${q}`)
        const { categories = [] } = data
        set({ categories })
      } catch (error) {
        const { response } = error
        set(() => ({ errorCategories: response.data.message }))
      }
    },
    createCategory: async ({ name, status }) => {
      set(() => ({ creatingCategory: true, errorCategoryCreate: null }))
      try {
        const { data: category } = await licoreriaApi.post('/categories', {
          name,
          status
        })
        set((state) => ({
          categories: [...state.categories, category],
          categoryCreated: true
        }))
        setTimeout(() => {
          set(() => ({ categoryCreated: false }))
        }, 50)
      } catch (error) {
        const { response } = error
        set(() => ({ errorCategoryCreate: response.data?.message }))
      } finally {
        set(() => ({ creatingCategory: false }))
      }
    },
    updateCategory: async (category) => {
      set(() => ({ updatingCategory: true }))
      const { id, nombre, activo } = updateCategoryAdapter(category)
      try {
        const { data: category } = await licoreriaApi.put(`/categories/${id}`, {
          nombre,
          activo
        })
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === category.id ? category : c
          ),
          categoryUpdated: true
        }))
        setTimeout(() => set(() => ({ categoryUpdated: false })), 50)
      } catch (error) {
        const { data } = error
        set(() => ({ errorCategoryUpdate: 'Error al actualizar' }))
        setTimeout(() => {
          set(() => ({ errorCategoryUpdate: null }))
        }, 50)
      } finally {
        set(() => ({ updatingCategory: false }))
      }
    },
    setCategories: (categories) => {
      set({ categories })
    }
  }))
)
