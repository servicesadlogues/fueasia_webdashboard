import { EmptyState, ResponsiveRecordList } from '../../../components/ui'
import { MembershipStatusBadge, PaymentStatusBadge } from '../../../components/ui/StatusBadge'
import { formatDate } from '../../../utils/formatDate'
import { formatMoney, membershipTypeLabel } from '../../../utils/labels'

const MEMBER_COLUMNS = ['Membership ID', 'Name', 'Type', 'Payment', 'Amount', 'Status', 'Expiry']

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

const MemberTable = ({ members, onOpen }) => (
  <ResponsiveRecordList
    items={members}
    getKey={(row) => row.membershipId}
    empty={(
      <EmptyState
        title="No members found"
        message="No members match these filters."
      />
    )}
    columns={MEMBER_COLUMNS}
    renderCard={(row) => <MemberCard row={row} onOpen={onOpen} />}
    renderRow={(row) => <MemberRow row={row} />}
    onActivate={(row) => onOpen(row.membershipId)}
  />
)

export default MemberTable
