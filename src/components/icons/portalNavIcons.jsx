import {
  BadgePercent,
  CalendarDays,
  CreditCard,
  FileText,
  LayoutDashboard,
  Mic2,
  Users,
  UserCircle,
  Wallet,
  IdCard,
} from 'lucide-react'

const base = { size: 18, strokeWidth: 2, 'aria-hidden': true }

export const PortalIcons = {
  overview: (props) => <LayoutDashboard {...base} {...props} />,
  profile: (props) => <UserCircle {...base} {...props} />,
  membership: (props) => <IdCard {...base} {...props} />,
  payments: (props) => <CreditCard {...base} {...props} />,
  documents: (props) => <FileText {...base} {...props} />,
  events: (props) => <CalendarDays {...base} {...props} />,
  users: (props) => <Users {...base} {...props} />,
  finance: (props) => <Wallet {...base} {...props} />,
  coupons: (props) => <BadgePercent {...base} {...props} />,
  speakers: (props) => <Mic2 {...base} {...props} />,
}
