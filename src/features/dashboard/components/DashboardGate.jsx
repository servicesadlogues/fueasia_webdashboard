import { useDashboard } from '../dashboardContext'
import { EmptyState } from '../../../components/ui'

const DashboardGate = ({ children }) => {
  const { loading, error, reload } = useDashboard()

  if (loading) {
    return (
      <EmptyState
        title="Loading your dashboard"
        message="Fetching your membership details…"
        action={<div className="spinner mx-auto" style={{ width: '2.5rem', height: '2.5rem', borderWidth: '3px' }} />}
      />
    )
  }

  if (error) {
    return (
      <EmptyState
        title="Could not load dashboard"
        message={error}
        action={(
          <button type="button" className="btn-primary" onClick={reload}>
            Try again
          </button>
        )}
      />
    )
  }

  return children
}

export default DashboardGate
