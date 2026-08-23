import { useAdminAuth } from '../../../context/AdminAuthContext'
import AppTopbar from '../../../components/layout/AppTopbar'
import { initials } from '../../dashboard/utils/labels'

const AdminTopbar = ({ onMenu }) => {
  const { admin, logout } = useAdminAuth()

  return (
    <AppTopbar
      title={admin?.name || 'Admin'}
      subtitle="Administrator"
      onMenu={onMenu}
      onLogout={logout}
      logoutConfirm={{
        message: 'You will need to sign in again to access the admin dashboard.',
      }}
      avatar={<div className="ds-avatar" aria-hidden="true">{initials(admin?.name || 'AD')}</div>}
    />
  )
}

export default AdminTopbar
