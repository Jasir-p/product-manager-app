import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/authService'
import Navbar from '../components/Navbar'

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  )
}
