import api from "../api/axios"

export  const signUp =async ({email,password})=>{
    const {data} = await api.post('/api/auth/signup',{email,password})
    if (data?.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user || { email }))
    }
    return data
}

export const signIn = async ({email,password})=>{
    const {data} = await api.post('/api/auth/signin')
    if (data?.token) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user || { email }))
    }
    return data

}

export const signOut =  ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('token'))
}

export function getCurrentUser() {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}
