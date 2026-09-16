import { formatDate } from '../../../utils/formatDate'
import { EmptyState, PageHeader } from '../../../components/ui'
import { useDashboard } from '../dashboardContext'
import { displayValue, formatMoney } from '../../../utils/labels'
import { PaymentStatusBadge } from '../../../components/ui'

const PaymentsPage = () => {
  const { payments, profile } = useDashboard()

  return (
    <div>
      <PageHeader
        title="Payments"
        subtitle="Track the status of your membership payment."
      />

      <div className="ds-panel mb-6">
        <p className="ds-caption">Current membership payment</p>
        <p className="ds-heading mt-1">{formatMoney(profile.amountPaid, profile.currency)}</p>
        <p className="ds-muted mt-1">
          Status: <PaymentStatusBadge status={profile.paymentStatus} />
        </p>
      </div>

      <div className="section-card">
        <div className="section-header">Payment history</div>
        {payments.length === 0 ? (
          <EmptyState
            title="No payment records yet"
            message="No payment records are linked to this membership yet."
          />
        ) : (
          <div className="ds-table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Order ID</th>
                  <th>Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((row) => (
                  <tr key={row.razorpayOrderId}>
                    <td>{formatDate(row.createdAt)}</td>
                    <td>{formatMoney(row.amount, row.currency)}</td>
                    <td><PaymentStatusBadge status={row.status} /></td>
                    <td className="font-mono text-xs">{row.razorpayOrderId}</td>
                    <td className="font-mono text-xs">{displayValue(row.razorpayPaymentId)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentsPage
