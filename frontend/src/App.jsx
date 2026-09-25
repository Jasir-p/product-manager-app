import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/Signin'
import SignUp from './pages/auth/SignUp'
import ProductForm from './pages/products/ProductForm'
import ProductList from './pages/products/ProductList'
import ProductView from './pages/products/ProductView'
import ProtectedRoute from './routes/ProtectedRoute'


function App() {
  const [count, setCount] = useState(0)

  return (
<Routes>

      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/products"element={<ProtectedRoute><ProductList /></ProtectedRoute>}/>
      <Route path="/products/new"element={<ProtectedRoute><ProductForm /></ProtectedRoute>}/>
      <Route path="/products/:id"element={<ProtectedRoute><ProductView /></ProtectedRoute>}/>
</Routes>
  )
}

export default App
