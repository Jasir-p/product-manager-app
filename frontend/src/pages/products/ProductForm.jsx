import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../services/productService'

export default function ProductForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', category: '', quantity: '', price: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  function validate() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.category.trim()) nextErrors.category = 'Category is required'
    if (form.quantity === '' || Number(form.quantity) < 0) {
      nextErrors.quantity = 'Quantity must be 0 or more'
    }
    if (form.price === '' || Number(form.price) < 0) {
      nextErrors.price = 'Price must be 0 or more'
    }
    return nextErrors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      await createProduct({
        name: form.name.trim(),
        category: form.category.trim(),
        quantity: Number(form.quantity),
        price: Number(form.price),
      })
      navigate('/products')
    } catch (err) {
      setServerError(
        err?.response?.data?.message || 'Could not add product. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-5 text-lg font-semibold text-gray-900">Add Product</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
        noValidate
      >
        {serverError && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.name ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="e.g. Laptop"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={form.category}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.category ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="e.g. Electronics"
          />
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="quantity" className="mb-1.5 block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              inputMode="numeric"
              min="0"
              value={form.quantity}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.quantity ? 'border-red-400' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
          </div>

          <div>
            <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.price ? 'border-red-400' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2.5 text-base font-medium text-white hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Adding…' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="rounded-md border border-gray-300 px-4 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
