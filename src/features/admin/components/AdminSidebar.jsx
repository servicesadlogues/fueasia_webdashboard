import AppSidebar from '../../../components/layout/AppSidebar'
import {
  IconCms,
  IconConference,
  IconCoupon,
  IconFinance,
  IconMembership,
  IconOverview,
  IconUsers,
} from '../../dashboard/components/Icons'

const LINKS = [
  { to: '/admin/home', end: true, label: 'Overview', icon: IconOverview },
  { to: '/admin/home/members', label: 'Members', icon: IconUsers },
  { to: '/admin/home/sun-pharma', label: 'Sun Pharma', icon: IconMembership },
  { to: '/admin/home/active', label: 'Active', icon: IconUsers },
  { to: '/admin/home/inactive', label: 'Inactive', icon: IconUsers },
  { to: '/admin/home/conferences', label: 'Conferences', icon: IconConference },
  { to: '/admin/home/finance', label: 'Finance', icon: IconFinance },
  { to: '/admin/home/content', label: 'Content', icon: IconCms },
  { to: '/admin/home/coupons', label: 'Coupons', icon: IconCoupon },
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
