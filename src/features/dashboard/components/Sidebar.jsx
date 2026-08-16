import AppSidebar from '../../../components/layout/AppSidebar'
import { IconDocuments, IconMembership, IconOverview, IconPayments, IconProfile } from './Icons'

const LINKS = [
  { to: '/home', end: true, label: 'Overview', icon: IconOverview },
  { to: '/home/profile', label: 'Profile', icon: IconProfile },
  { to: '/home/membership', label: 'Membership', icon: IconMembership },
  { to: '/home/payments', label: 'Payments', icon: IconPayments },
  { to: '/home/documents', label: 'Documents', icon: IconDocuments },
]

const Sidebar = (props) => (
  <AppSidebar
    {...props}
    title="FUE Global"
    subtitle="Member portal"
    footer="Member dashboard"
    links={LINKS}
  />
)

export default Sidebar
