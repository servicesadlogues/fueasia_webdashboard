import { formatDate } from '../../../utils/formatDate'
import PageHeader from '../../../components/ui/PageHeader'
import { useDashboard } from '../dashboardContext'
import { displayValue, formatMoney, membershipTypeLabel } from '../../../utils/labels'
import { InfoGrid, MembershipStatusBadge } from '../../../components/ui'
import MembershipCard from '../components/MembershipCard'

const MembershipPage = () => {
  const { profile } = useDashboard()
  const expired = profile.membershipStatus === 'expired'
  const expiring = profile.membershipStatus === 'expiring'

  return (
    <div>
      <PageHeader
        title="Membership"
        subtitle="Your FUE Global membership ID, validity, and status."
        actions={<MembershipStatusBadge status={profile.membershipStatus} />}
      />

      {(expired || expiring) && (
        <p className={`mb-6 ${expired ? 'alert-danger' : 'ds-panel'}`} role="status">
          {expired
            ? 'Your membership has expired. Please contact FUE Global at contact@fueasia.org to renew.'
            : `Your membership expires on ${formatDate(profile.membershipExpiryDate)}. A renewal reminder is sent 30 days before expiry.`}
        </p>
      )}

      <div className="mb-6 max-w-xl">
        <MembershipCard profile={profile} />
      </div>

      <div className="section-card">
        <div className="section-header">Membership details</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Membership ID', value: profile.membershipId },
              { label: 'Member type', value: membershipTypeLabel(profile.memberType) },
              { label: 'Status', value: profile.membershipIsActive ? 'Active on record' : 'Inactive on record' },
              { label: 'Valid from', value: formatDate(profile.membershipStartDate) },
              { label: 'Valid until', value: formatDate(profile.membershipExpiryDate) },
              { label: 'Validity period', value: `${profile.membershipValidityMonths} months` },
              { label: 'Registered on', value: formatDate(profile.registeredAt) },
              { label: 'Login ID', value: profile.membershipId },
            ]}
          />
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">Registration payment snapshot</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Amount paid', value: formatMoney(profile.amountPaid, profile.currency) },
              { label: 'Currency', value: profile.currency },
              { label: 'Payment status', value: displayValue(profile.paymentStatus) },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default MembershipPage
