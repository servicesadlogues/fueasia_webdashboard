import { Users, Wallet, CalendarDays, BadgePercent } from 'lucide-react'
import { EmptyState, PageHeader, StatCard } from '../../../components/ui'
import { formatMoney } from '../../../utils/labels'
import { useAdminStats } from '../hooks/useAdminStats'

const AdminOverviewPage = () => {
  const { stats, loading } = useAdminStats()

  if (loading) {
    return (
      <EmptyState
        title="Loading overview"
        message="Fetching membership and revenue stats…"
      />
    )
  }

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle="Membership, payments, and conferences at a glance."
      />
      <div className="ds-stat-grid mb-6">
        <StatCard label="Total members" icon={Users} value={stats?.membersTotal ?? 0} to="/admin/home/members" />
        <StatCard label="Active" icon={Users} value={stats?.membersActive ?? 0} to="/admin/home/active" />
        <StatCard label="Inactive" icon={Users} value={stats?.membersInactive ?? 0} to="/admin/home/inactive" />
        <StatCard label="Sun Pharma" icon={BadgePercent} value={stats?.membersSunPharma ?? 0} to="/admin/home/sun-pharma" />
      </div>
      <div className="ds-stat-grid">
        <StatCard label="Membership revenue" icon={Wallet} value={formatMoney(stats?.membershipRevenue || 0, stats?.currency)} to="/admin/home/finance" />
        <StatCard label="Total revenue" icon={Wallet} value={formatMoney(stats?.revenueTotal || 0, stats?.currency)} to="/admin/home/finance" />
        <StatCard label="Active events" icon={CalendarDays} value={stats?.activeConferences ?? 0} to="/admin/home/conferences" />
      </div>
    </>
  )
}

export default AdminOverviewPage
