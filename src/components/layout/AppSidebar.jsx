import { X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import IconButton from '../ui/IconButton'
import { BRAND_LOGO_URL } from '../../constants/brand'

const AppSidebar = ({ open, onClose, title, subtitle, links, footer }) => (
  <aside className={`ds-dash-sidebar ${open ? 'is-open' : ''}`} aria-label={title}>
    <div className="ds-dash-brand">
      <img src={BRAND_LOGO_URL} alt="FUE Global" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-white/50">{subtitle}</p>
      </div>
      <IconButton label="Close menu" className="md:hidden" onClick={onClose}>
        <X size={18} strokeWidth={2} aria-hidden />
      </IconButton>
    </div>
    <nav className="ds-dash-nav" aria-label={subtitle}>
      {links.map(({ to, end, label, icon: Icon, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `ds-nav-link${isActive ? ' is-active' : ''}`}
          onClick={onClose}
        >
          <Icon />
          <span className="ds-nav-link-label">{label}</span>
          {badge > 0 ? (
            <span className="ds-nav-badge" aria-label={`${badge} upcoming event${badge === 1 ? '' : 's'}`}>
              {badge > 99 ? '99+' : badge}
            </span>
          ) : null}
        </NavLink>
      ))}
    </nav>
    <div className="ds-dash-sidebar-foot">{footer}</div>
  </aside>
)

export default AppSidebar
