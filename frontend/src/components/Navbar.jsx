import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../services/authService'

export default function Navbar() {
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/products" className="text-base font-semibold text-gray-900">
          Product Manager
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/products"
            className="rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:px-3"
          >
            Products
          </Link>
          <Link
            to="/products/new"
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:inline-block"
          >
            Add Product
          </Link>
          <Link
            to="/products/new"
            aria-label="Add product"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:hidden"
          >
            <PlusIcon />
          </Link>
          <button
            onClick={handleLogout}
            className="rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 sm:px-3"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  )
}
