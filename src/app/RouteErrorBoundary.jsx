import { useLocation } from 'react-router-dom'
import AppErrorBoundary from '../components/feedback/AppErrorBoundary'

const RouteErrorBoundary = ({ children }) => {
  const location = useLocation()
  return <AppErrorBoundary key={location.pathname}>{children}</AppErrorBoundary>
}

export default RouteErrorBoundary
