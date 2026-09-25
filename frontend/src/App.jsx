import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/auth/Signin'
import SignUp from './pages/auth/SignUp'


function App() {
  const [count, setCount] = useState(0)

  return (
<Routes>

      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
</Routes>
  )
}

export default App
