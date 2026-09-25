import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, deleteProduct } from '../../services/productService'

function formatPrice(value) {
  const number = Number(value) || 0
  return `₹${number.toLocaleString('en-IN')}`
}

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    setError('')
    try {
      const data = await getProducts()
      setProducts(Array.isArray(data) ? data : data.products || [])
    } catch (err) {
      setError('Could not load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    setDeletingId(id)
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => (p.id || p._id) !== id))
    } catch (err) {
      setError('Could not delete product. Please try again.')
    } finally {
      setDeletingId(null)
      setPendingDeleteId(null)
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <Link
          to="/products/new"
          className="rounded-md bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
        >
          Add Product
        </Link>
      </div>

      {error && (
        <div className="mb-4 flex items-center justify-between rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={loadProducts} className="font-medium underline">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <LoadingGrid />
      ) : products.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const id = product.id || product._id
            return (
              <div
                key={id}
                className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex-1">
                  <h2 className="truncate text-base font-semibold text-gray-900">{product.name}</h2>
                  <p className="mt-0.5 text-sm text-gray-500">{product.category}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-gray-100 pt-3">
                  <Link
                    to={`/products/${id}`}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => setPendingDeleteId(id)}
                    className="flex-1 rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>

                {pendingDeleteId === id && (
                  <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 p-3">
                    <p className="mb-2 text-sm text-gray-700">Delete "{product.name}"?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(id)}
                        disabled={deletingId === id}
                        className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
                      >
                        {deletingId === id ? 'Deleting…' : 'Confirm'}
                      </button>
                      <button
                        onClick={() => setPendingDeleteId(null)}
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-4">
          <div className="h-4 w-2/3 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-1/3 rounded bg-gray-200" />
          <div className="mt-4 h-3 w-1/2 rounded bg-gray-200" />
          <div className="mt-4 h-9 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-14 text-center">
      <p className="text-base font-medium text-gray-900">No products yet</p>
      <p className="mt-1 text-sm text-gray-500">Add your first product to get started.</p>
      <Link
        to="/products/new"
        className="mt-4 inline-block rounded-md bg-primary-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-700"
      >
        Add Product
      </Link>
    </div>
  )
}
