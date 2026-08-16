import { Outlet } from 'react-router-dom'
import AppShell from '../../components/layout/AppShell'
import AdminSidebar from './components/AdminSidebar'
import AdminTopbar from './components/AdminTopbar'

const AdminLayout = () => (
  <AppShell
    sidebar={(props) => <AdminSidebar {...props} />}
    topbar={(props) => <AdminTopbar {...props} />}
  >
    <Outlet />
  </AppShell>
)

export default AdminLayout
