import { Navigate, useLocation } from 'react-router-dom'
import { sanitizeRedirectPath } from '../../utils/urls'
import AuthBusy from './AuthBusy'

const RequireAuth = ({ useAuth, loginPath, homePath, children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <AuthBusy />
  if (!isAuthenticated) {
    return (
      <Navigate
        to={loginPath}
        replace
        state={{ from: sanitizeRedirectPath(location.pathname, homePath) }}
      />
    )
  }
  return children
}

export default RequireAuth
