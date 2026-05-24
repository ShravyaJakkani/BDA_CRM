import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginService, register as registerService } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for token in localStorage on mount
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await loginService(email, password)
      const { token: newToken, user: newUser } = response
      
      // Save to localStorage
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))
      
      setToken(newToken)
      setUser(newUser)
      
      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await registerService(name, email, password)
      const { token: newToken, user: newUser } = response
      
      // Save to localStorage
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify(newUser))
      
      setToken(newToken)
      setUser(newUser)
      
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
