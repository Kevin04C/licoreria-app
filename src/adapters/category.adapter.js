export const updateCategoryAdapter = (category) => {
  const { id, nombre, estado } = category
  const { activo } = estado
  return {
    id,
    nombre,
    activo: activo === 'true'
  }
}

export const categoriesOptionsSelectAdapter = (categories = []) => {
  return categories.map((category) => ({
    value: category.id,
    label: category.nombre
  }))
}
