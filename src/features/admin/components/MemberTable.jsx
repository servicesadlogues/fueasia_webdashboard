import { MembershipStatusBadge, PaymentStatusBadge } from '../../dashboard/components/StatusBadge'
import { formatDate } from '../../../utils/formatDate'
import { formatMoney, membershipTypeLabel } from '../../dashboard/utils/labels'

const MemberRow = ({ row }) => (
  <>
    <td className="font-semibold text-navy">{row.membershipId}</td>
    <td>
      <p className="font-medium">{row.name}</p>
      <p className="ds-caption">{row.email}</p>
    </td>
    <td>{membershipTypeLabel(row.memberType)}</td>
    <td><PaymentStatusBadge status={row.paymentStatus} /></td>
    <td>{formatMoney(row.amountPaid, row.currency)}</td>
    <td><MembershipStatusBadge status={row.membershipStatus} /></td>
    <td>{formatDate(row.membershipExpiryDate)}</td>
  </>
)

const MemberCard = ({ row, onOpen }) => (
  <button
    type="button"
    className="ds-list-card"
    onClick={() => onOpen(row.membershipId)}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-semibold text-navy truncate">{row.name}</p>
        <p className="ds-caption truncate">{row.membershipId}</p>
        <p className="ds-caption truncate">{row.email}</p>
      </div>
      <MembershipStatusBadge status={row.membershipStatus} />
    </div>
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="ds-caption">{membershipTypeLabel(row.memberType)}</span>
      <PaymentStatusBadge status={row.paymentStatus} />
      <span className="ds-caption">{formatMoney(row.amountPaid, row.currency)}</span>
    </div>
    <p className="ds-caption mt-2">Expiry {formatDate(row.membershipExpiryDate)}</p>
  </button>
)

const MemberTable = ({ members, onOpen }) => {
  if (!members?.length) {
    return <div className="ds-empty">No members match these filters.</div>
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {members.map((row) => (
          <MemberCard key={row.membershipId} row={row} onOpen={onOpen} />
        ))}
      </div>
      <div className="ds-table-wrap hidden md:block">
        <table className="ds-table">
          <thead>
            <tr>
              <th>Membership ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {members.map((row) => (
              <tr
                key={row.membershipId}
                className="cursor-pointer hover:bg-page"
                onClick={() => onOpen(row.membershipId)}
              >
                <MemberRow row={row} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MemberTable
