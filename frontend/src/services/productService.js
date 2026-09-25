import api from "../api/axios";

export async function getProducts() {
  const { data } = await api.get('/api/products')
  return data
}

export async function getProduct(id) {
  const { data } = await api.get(`/api/products/${id}`)
  return data
}

export async function createProduct(product) {
  const { data } = await api.post('/api/products', product)
  return data
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/api/products/${id}`)
  return data
}
