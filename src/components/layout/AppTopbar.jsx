import { LogOut, Menu } from 'lucide-react'
import { useState } from 'react'
import ConfirmDialog from '../ui/ConfirmDialog'
import IconButton from '../ui/IconButton'

const AppTopbar = ({
  title,
  subtitle,
  avatar,
  onMenu,
  onLogout,
  logoutConfirm,
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const logoutCopy = {
    title: 'Log out?',
    message: 'You will need to sign in again to access your account.',
    confirmLabel: 'Yes, log out',
    cancelLabel: 'Stay signed in',
    ...logoutConfirm,
  }

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false)
    onLogout?.()
  }

  return (
    <>
      <header className="ds-dash-topbar">
        <div className="flex min-w-0 items-center gap-3">
          <IconButton label="Open menu" className="md:hidden" onClick={onMenu}>
            <Menu size={18} strokeWidth={2} aria-hidden />
          </IconButton>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy truncate">{title}</p>
            <p className="ds-caption truncate">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {avatar}
          <IconButton label="Log out" onClick={() => setShowLogoutConfirm(true)}>
            <LogOut size={18} strokeWidth={2} aria-hidden />
          </IconButton>
        </div>
      </header>

      <ConfirmDialog
        open={showLogoutConfirm}
        variant="neutral"
        title={logoutCopy.title}
        message={logoutCopy.message}
        confirmLabel={logoutCopy.confirmLabel}
        cancelLabel={logoutCopy.cancelLabel}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  )
}

export default AppTopbar
