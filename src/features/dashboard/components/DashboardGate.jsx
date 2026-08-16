import { useDashboard } from '../dashboardContext'

const DashboardGate = ({ children }) => {
  const { loading, error, reload } = useDashboard()

  if (loading) return null

  if (error) {
    return (
      <div className="section-card max-w-lg">
        <div className="section-body">
          <p className="alert-danger mb-4">{error}</p>
          <button type="button" className="btn-primary" onClick={reload}>Try again</button>
        </div>
      </div>
    )
  }

  return children
}

export default DashboardGate
