import AppSidebar from '../../../components/layout/AppSidebar'
import { PortalIcons } from '../../../components/icons/portalNavIcons'
import { useDashboard } from '../dashboardContext'

const BASE_LINKS = [
  { to: '/home', end: true, label: 'Overview', icon: PortalIcons.overview },
  { to: '/home/profile', label: 'Profile', icon: PortalIcons.profile },
  { to: '/home/membership', label: 'Membership', icon: PortalIcons.membership },
  { to: '/home/payments', label: 'Payments', icon: PortalIcons.payments },
  { to: '/home/documents', label: 'Documents', icon: PortalIcons.documents },
  { to: '/home/events', label: 'Upcoming Events', icon: PortalIcons.events },
]

const Sidebar = (props) => {
  const { events } = useDashboard()
  const eventCount = events.length

  const links = BASE_LINKS.map((link) => (
    link.to === '/home/events' && eventCount > 0
      ? { ...link, badge: eventCount }
      : link
  ))

  return (
    <AppSidebar
      {...props}
      title="FUE Global"
      subtitle="Member portal"
      footer="Member dashboard"
      links={links}
    />
  )
}

export default Sidebar
