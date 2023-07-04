export const updateCategoryAdapter = (category) => {
  const { id, nombre, estado } = category
  const { activo } = estado
  return {
    id,
    nombre,
    activo: activo === 'true'
  }
}
