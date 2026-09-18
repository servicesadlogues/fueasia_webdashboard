import AppSidebar from '../../../components/layout/AppSidebar'
import { PortalIcons } from '../../../components/icons/portalNavIcons'

const LINKS = [
  { to: '/admin/home', end: true, label: 'Overview', icon: PortalIcons.overview },
  { to: '/admin/home/members', label: 'Members', icon: PortalIcons.users },
  { to: '/admin/home/sun-pharma', label: 'Sun Pharma', icon: PortalIcons.membership },
  { to: '/admin/home/active', label: 'Active', icon: PortalIcons.users },
  { to: '/admin/home/inactive', label: 'Inactive', icon: PortalIcons.users },
  { to: '/admin/home/conferences', label: 'Conferences', icon: PortalIcons.events },
  { to: '/admin/home/speakers', label: 'Speakers', icon: PortalIcons.speakers },
  { to: '/admin/home/finance', label: 'Finance', icon: PortalIcons.finance },
  { to: '/admin/home/coupons', label: 'Coupons', icon: PortalIcons.coupons },
]

const AdminSidebar = (props) => (
  <AppSidebar
    {...props}
    title="FUE Global"
    subtitle="Admin portal"
    footer="Admin dashboard"
    links={LINKS}
  />
)

export default AdminSidebar
