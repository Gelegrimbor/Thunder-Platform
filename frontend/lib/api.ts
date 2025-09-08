import axios from 'axios'
import Cookies from 'js-cookie'

// Debug: Check environment variables
console.log('=== ENVIRONMENT DEBUG ===')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('NEXT_PUBLIC_PAYLOAD_API_URL:', process.env.NEXT_PUBLIC_PAYLOAD_API_URL)

const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3000'

console.log('Final API_URL being used:', API_URL)
console.log('Full baseURL will be:', `${API_URL}/api`)
console.log('========================')

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('payload-token')
  if (token) {
    config.headers.Authorization = `JWT ${token}`
  }
  return config
})

export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      console.log('Attempting login to:', `${API_URL}/api/users/login`)
      const response = await api.post('/users/login', { email, password })
      
      if (response.data.token) {
        Cookies.set('payload-token', response.data.token, { expires: 7 })
      }
      return response.data
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message)
      throw error
    }
  },
  
  logout: () => {
    Cookies.remove('payload-token')
  },
  
  me: async () => {
    try {
      const response = await api.get('/users/me')
      return response.data
    } catch (error: any) {
      console.error('Auth check failed:', error)
      return null
    }
  }
}

export const postsAPI = {
  getAll: async () => {
    const response = await api.get('/posts?depth=2')
    return response.data
  },
  
  create: async (postData: any) => {
    const token = Cookies.get('payload-token')
    console.log('Creating post with token:', token ? 'Token present' : 'No token')
    
    const response = await api.post('/posts', postData)
    return response.data
  }
}