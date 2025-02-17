import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkAuth(token)
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuth = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/auth/check', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.isAuthenticated) {
        setUser({ isAuthenticated: true, ...response.data.user })
      } else {
        localStorage.removeItem('token')
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials)

      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token)
        setUser({ isAuthenticated: true, ...response.data.data.user })
        return true
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error) {
      throw error.response?.data?.message || 'Login failed'
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
