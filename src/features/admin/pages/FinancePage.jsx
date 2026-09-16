import { PageHeader, StatCard } from '../../../components/ui'
import { formatMoney } from '../../../utils/labels'
import { useAdminStats } from '../hooks/useAdminStats'
import { Wallet } from 'lucide-react'

const FinancePage = () => {
  const { stats } = useAdminStats()

  return (
    <div>
      <PageHeader
        title="Finance"
        subtitle="Membership revenue from successful payments."
      />
      <div className="ds-stat-grid">
        <StatCard label="Membership revenue" icon={Wallet} value={formatMoney(stats?.membershipRevenue || 0, stats?.currency)} />
        <StatCard label="Total revenue" icon={Wallet} value={formatMoney(stats?.revenueTotal || 0, stats?.currency)} />
      </div>
    </div>
  )
}

export default FinancePage
