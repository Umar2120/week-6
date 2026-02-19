import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, adminOnly = false, requireRealUser = false }) {
  const { isAuthenticated, role, isLoading } = useAuth()

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireRealUser && role === 'guest') {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && role !== 'admin') {
    // non-admins can't access this route
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
