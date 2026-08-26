import { MEMBERSHIP_STATUS_LABELS, PAYMENT_STATUS_LABELS } from '../utils/labels'

const CHIP = {
  active: 'ds-chip ds-chip-success',
  expiring: 'ds-chip ds-chip-pending',
  expired: 'ds-chip ds-chip-danger',
  inactive: 'ds-chip ds-chip-muted',
  success: 'ds-chip ds-chip-success',
  pending: 'ds-chip ds-chip-pending',
  created: 'ds-chip ds-chip-pending',
  failed: 'ds-chip ds-chip-danger',
}

export const MembershipStatusBadge = ({ status }) => (
  <span className={CHIP[status] || 'ds-chip ds-chip-muted'}>
    {MEMBERSHIP_STATUS_LABELS[status] || status || '-'}
  </span>
)

export const PaymentStatusBadge = ({ status }) => (
  <span className={CHIP[status] || 'ds-chip ds-chip-muted'}>
    {PAYMENT_STATUS_LABELS[status] || status || '-'}
  </span>
)
