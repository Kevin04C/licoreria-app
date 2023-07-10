export const newProductAdapter = (productForm) => {
  const {
    category: { value },
    active,
    ...rest
  } = productForm
  return {
    ...rest,
    active: active === 'true',
    categoryId: value
  }
}

export const updateGetProductDBAdapter = (productDB) => {
  const { id, nombre, precio, existencias, categorias, estado } = productDB
  const { id: categoryId, nombre: nameCategory } = categorias
  const { activo } = estado

  return {
    id,
    name: nombre,
    price: Number(precio),
    stock: existencias,
    active: activo.toString(),
    category: { value: categoryId, label: nameCategory }
  }
}

export const updateProductAdapter = (productForm) => {
  const {
    category: { value },
    active,
    ...rest
  } = productForm
  return {
    ...rest,
    active: active === 'true',
    categoryId: value
  }
}
