import PageHeader from '../../../components/ui/PageHeader'
import StatCard from '../../../components/ui/StatCard'
import { formatMoney } from '../../dashboard/utils/labels'
import { useAdminStats } from '../hooks/useAdminStats'

const AdminOverviewPage = () => {
  const { stats, loading } = useAdminStats()

  if (loading) return null

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Membership, payments, conferences, and content at a glance."
      />
      <div className="ds-stat-grid mb-6">
        <StatCard label="Total members" value={stats?.membersTotal ?? 0} to="/admin/home/members" />
        <StatCard label="Active" value={stats?.membersActive ?? 0} to="/admin/home/active" />
        <StatCard label="Inactive" value={stats?.membersInactive ?? 0} to="/admin/home/inactive" />
        <StatCard label="Sun Pharma" value={stats?.membersSunPharma ?? 0} to="/admin/home/sun-pharma" />
      </div>
      <div className="ds-stat-grid">
        <StatCard label="Membership revenue" value={formatMoney(stats?.membershipRevenue || 0, stats?.currency)} to="/admin/home/finance" />
        <StatCard label="Conference revenue" value={formatMoney(stats?.conferenceRevenue || 0, stats?.currency)} to="/admin/home/finance" />
        <StatCard label="Combined revenue" value={formatMoney(stats?.revenueTotal || 0, stats?.currency)} />
        <StatCard label="Conference registrations" value={stats?.conferenceRegistrations ?? 0} to="/admin/home/conferences" />
      </div>
    </div>
  )
}

export default AdminOverviewPage
