import { IconLogout, IconMenu } from '../../features/dashboard/components/Icons'

const AppTopbar = ({ title, subtitle, avatar, onMenu, onLogout }) => (
  <header className="ds-dash-topbar">
    <div className="flex min-w-0 items-center gap-3">
      <button type="button" className="ds-icon-btn md:hidden" onClick={onMenu} aria-label="Open menu">
        <IconMenu />
      </button>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy truncate">{title}</p>
        <p className="ds-caption truncate">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      {avatar}
      <button type="button" className="ds-icon-btn" onClick={onLogout} aria-label="Log out" title="Log out">
        <IconLogout />
      </button>
    </div>
  </header>
)

export default AppTopbar
