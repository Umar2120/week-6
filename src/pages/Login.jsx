import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Login.css'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = (credentials) => {
    const success = login(credentials)
    if (success) {
      if (credentials === 'guest') {
        navigate('/checkout')
      } else {
        navigate('/profile')
      }
    } else {
      setError('Invalid username or password')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.username || !form.password) {
      setError('Please fill both fields')
      return
    }
    handleLogin(form)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to ShopZone</h1>
          <p>Sign in to continue to checkout</p>
        </div>

        <div className="login-content">
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="login-btn guest-btn">
              Login
            </button>
          </form>

          <div className="divider">
            <span>Or</span>
          </div>

          <button className="login-btn admin-btn" onClick={() => handleLogin('guest')}>
            👤 Login as Guest
          </button>

          <p className="info-text">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </div>

        <div className="login-footer">
          <p hidden className="security-note">Admin: username="admin", password="admin123"</p>
        </div>
      </div>
    </div>
  )
}

export default Login
