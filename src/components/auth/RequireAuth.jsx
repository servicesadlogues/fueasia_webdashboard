import { Navigate, useLocation } from 'react-router-dom'
import AuthBusy from './AuthBusy'

const RequireAuth = ({ useAuth, loginPath, children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <AuthBusy />
  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace state={{ from: location.pathname }} />
  }
  return children
}

export default RequireAuth
