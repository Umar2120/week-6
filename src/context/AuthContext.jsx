import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState('guest') // 'guest' or 'admin' or 'user'
  const [user, setUser] = useState(null) // {username, role}
  const [users, setUsers] = useState([]) // registered accounts
  const [isLoading, setIsLoading] = useState(true)

  // Load auth/users state from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('shopzone_users')
    if (savedUsers) {
      try {
        setUsers(JSON.parse(savedUsers))
      } catch {
        setUsers([])
      }
    }

    // ensure there is at least one admin account
    setUsers(prev => {
      if (!prev.find(u => u.role === 'admin')) {
        const admin = { username: 'admin', password: 'admin123', role: 'admin' }
        const updated = [...prev, admin]
        localStorage.setItem('shopzone_users', JSON.stringify(updated))
        return updated
      }
      return prev
    })

    const savedAuth = localStorage.getItem('shopzone_auth')
    if (savedAuth) {
      try {
        const { auth, role: savedRole, username } = JSON.parse(savedAuth)
        if (auth) {
          setIsAuthenticated(true)
          setRole(savedRole || 'guest')
          setUser({ username, role: savedRole })
        }
      } catch {}
    }
    setIsLoading(false)
  }, [])

  const login = (credentials) => {
    // credentials: {username, password} or 'guest'
    if (credentials === 'guest') {
      setIsAuthenticated(true)
      setRole('guest')
      setUser({ username: null, role: 'guest' })
      localStorage.setItem('shopzone_auth', JSON.stringify({ auth: true, role: 'guest' }))
      return true
    }
    const { username, password } = credentials
    const found = users.find(u => u.username === username && u.password === password)
    if (found) {
      setIsAuthenticated(true)
      setRole(found.role)
      setUser({ username: found.username, role: found.role })
      localStorage.setItem('shopzone_auth', JSON.stringify({ auth: true, role: found.role, username: found.username }))
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setRole('guest')
    setUser(null)
    localStorage.removeItem('shopzone_auth')
  }

  const signup = ({ username, password }) => {
    if (users.find(u => u.username === username)) {
      return false // already exists
    }
    const newUser = { username, password, role: 'user' }
    const updated = [...users, newUser]
    setUsers(updated)
    localStorage.setItem('shopzone_users', JSON.stringify(updated))
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        user,
        login,
        logout,
        signup,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
