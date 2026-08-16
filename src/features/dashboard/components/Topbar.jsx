import { useAuth } from '../../../context/AuthContext'
import AppTopbar from '../../../components/layout/AppTopbar'
import Avatar from './Avatar'

const Topbar = ({ photoUrl, onMenu }) => {
  const { member, logout } = useAuth()

  return (
    <AppTopbar
      title={member?.name}
      subtitle={member?.membershipId}
      onMenu={onMenu}
      onLogout={logout}
      avatar={<Avatar name={member?.name} src={photoUrl} />}
    />
  )
}

export default Topbar
