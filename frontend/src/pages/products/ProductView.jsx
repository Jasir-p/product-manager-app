import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct, deleteProduct } from '../../services/productService'

function formatPrice(value) {
  const number = Number(value) || 0
  return `₹${number.toLocaleString('en-IN')}`
}

function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function ProductView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function loadProduct() {
    setLoading(true)
    setError('')
    try {
      const data = await getProduct(id)
      setProduct(data)
    } catch (err) {
      setError('Could not load this product.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await deleteProduct(id)
      navigate('/products')
    } catch (err) {
      setError('Could not delete product. Please try again.')
      setDeleting(false)
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <button
        onClick={() => navigate('/products')}
        className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <BackIcon />
        Back
      </button>

      {loading ? (
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
          <div className="h-5 w-2/3 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-1/3 rounded bg-gray-200" />
          <div className="mt-6 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-full rounded bg-gray-200" />
        </div>
      ) : error && !product ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
          {error}
        </div>
      ) : product ? (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <h1 className="text-lg font-semibold text-gray-900">{product.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>

          <dl className="mt-5 divide-y divide-gray-100 border-t border-gray-100">
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-gray-500">Price</dt>
              <dd className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-gray-500">Quantity</dt>
              <dd className="text-sm font-medium text-gray-900">{product.quantity}</dd>
            </div>
            <div className="flex items-center justify-between py-3">
              <dt className="text-sm text-gray-500">Created</dt>
              <dd className="text-sm font-medium text-gray-900">
                {formatDate(product.createdAt || product.created_at)}
              </dd>
            </div>
          </dl>

          {!confirmingDelete ? (
            <button
              onClick={() => setConfirmingDelete(true)}
              className="mt-6 w-full rounded-md border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete Product
            </button>
          ) : (
            <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-3">
              <p className="mb-2 text-sm text-gray-700">Delete "{product.name}"? This can't be undone.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 rounded-md bg-red-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {deleting ? 'Deleting…' : 'Confirm Delete'}
                </button>
                <button
                  onClick={() => setConfirmingDelete(false)}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  )
}
