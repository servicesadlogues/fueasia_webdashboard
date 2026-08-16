import PageHeader from '../../../components/ui/PageHeader'
import StatCard from '../../../components/ui/StatCard'
import { formatMoney } from '../../dashboard/utils/labels'
import { useAdminStats } from '../hooks/useAdminStats'

const FinancePage = () => {
  const { stats } = useAdminStats()

  return (
    <div>
      <PageHeader
        title="Finance"
        subtitle="Membership revenue, conference revenue, and combined totals (successful payments only)."
      />
      <div className="ds-stat-grid">
        <StatCard label="Membership revenue" value={formatMoney(stats?.membershipRevenue || 0, stats?.currency)} />
        <StatCard label="Conference revenue" value={formatMoney(stats?.conferenceRevenue || 0, stats?.currency)} />
        <StatCard label="Combined" value={formatMoney(stats?.revenueTotal || 0, stats?.currency)} />
        <StatCard label="Conference registrations" value={stats?.conferenceRegistrations ?? 0} />
      </div>
    </div>
  )
}

export default FinancePage
