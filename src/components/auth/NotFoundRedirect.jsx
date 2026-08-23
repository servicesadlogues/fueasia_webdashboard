import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAdminAuth } from '../../context/AdminAuthContext'

const NotFoundRedirect = () => {
  const { isAuthenticated: isMember } = useAuth()
  const { isAuthenticated: isAdmin } = useAdminAuth()

  if (isAdmin) return <Navigate to="/admin/home" replace />
  if (isMember) return <Navigate to="/home" replace />
  return <Navigate to="/" replace />
}

export default NotFoundRedirect
