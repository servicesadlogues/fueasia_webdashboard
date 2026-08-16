import { Outlet } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell'
import { DashboardProvider } from './DashboardProvider'
import { useDashboard } from './dashboardContext'
import DashboardGate from './components/DashboardGate'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import PrintSummary from './components/PrintSummary'

const DashboardShell = () => {
  const { photoUrl, profile, payments } = useDashboard()

  return (
    <AppShell
      sidebar={(props) => <Sidebar {...props} />}
      topbar={(props) => <Topbar {...props} photoUrl={photoUrl} />}
    >
      <DashboardGate>
        <Outlet />
        <PrintSummary profile={profile} payments={payments} />
      </DashboardGate>
    </AppShell>
  )
}

const DashboardLayout = () => (
  <DashboardProvider>
    <DashboardShell />
  </DashboardProvider>
)

export default DashboardLayout
