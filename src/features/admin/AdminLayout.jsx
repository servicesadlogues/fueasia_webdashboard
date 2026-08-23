import { Outlet } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell'
import AdminSidebar from './components/AdminSidebar'
import AdminTopbar from './components/AdminTopbar'
import { AdminStatsProvider } from './AdminStatsProvider'

const AdminLayout = () => (
  <AdminStatsProvider>
    <AppShell
      sidebar={(props) => <AdminSidebar {...props} />}
      topbar={(props) => <AdminTopbar {...props} />}
    >
      <Outlet />
    </AppShell>
  </AdminStatsProvider>
)

export default AdminLayout
