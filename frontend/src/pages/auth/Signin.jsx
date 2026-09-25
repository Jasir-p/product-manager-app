import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from "../../services/authService";


 const SignIn = ()=>{
    const navigate = useNavigate()
    const[form,setForm]= useState({email:'',password:''})
      const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)



  const validate=()=>{
    const nextErrors={}
    if (!form.email.trim()) nextErrors.email = 'Email is required'
    if (!form.password) nextErrors.password = 'Password is required'
    return nextErrors
  }



async function handleSubmit(e){
    e.preventDefault()
    setApiError('')

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    
    try {
      await signIn(form)
      navigate('/products')
    } catch (err) {
      setApiError(
        err?.response?.data?.message || 'Unable to sign in. Check your details and try again.'
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Sign in</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back to Product Manager</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
          noValidate
        >
          {apiError && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {apiError}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.email ? 'border-red-400' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2.5 text-base text-gray-900 outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.password ? 'border-red-400' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-base font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
export default SignIn