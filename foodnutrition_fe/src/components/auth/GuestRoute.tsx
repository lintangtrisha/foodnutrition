import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function GuestRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="auth-loading">Loading...</div>
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default GuestRoute