import { formatDate } from '../../../utils/formatDate'
import { formatMoney, membershipTypeLabel, specialityLabel, displayValue } from '../utils/labels'
import InfoGrid from './InfoGrid'
import MembershipCard from './MembershipCard'
import { PaymentStatusBadge } from './StatusBadge'

const PrintSummary = ({ profile, payments }) => {
  if (!profile) return null
  return (
    <div className="ds-print-only">
      <h1 className="ds-display mb-2">FUE Global — Membership summary</h1>
      <p className="ds-muted mb-6">{profile.membershipId}</p>
      <div className="mb-6">
        <MembershipCard profile={profile} />
      </div>
      <div className="section-card">
        <div className="section-header">Submitted information</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Name', value: profile.name },
              { label: 'Email', value: profile.email },
              { label: 'Mobile', value: [profile.mobileCountryCode, profile.mobile].filter(Boolean).join(' ') },
              { label: 'Gender', value: displayValue(profile.gender) },
              { label: 'Date of birth', value: formatDate(profile.dob) },
              { label: 'Address', value: displayValue(profile.address) },
              { label: 'City', value: displayValue(profile.city) },
              { label: 'Institute', value: displayValue(profile.institute) },
              { label: 'Designation', value: displayValue(profile.designation) },
              { label: 'Medical number', value: profile.medicalNumber },
              { label: 'Country', value: profile.country },
              { label: 'Issuing authority', value: profile.issuingAuthority },
              { label: 'Speciality', value: specialityLabel(profile) },
              { label: 'Other associations', value: displayValue(profile.otherAssociations) },
              { label: 'Reference no.', value: displayValue(profile.refNo) },
              { label: 'Member type', value: membershipTypeLabel(profile.memberType) },
              { label: 'Valid from', value: formatDate(profile.membershipStartDate) },
              { label: 'Valid until', value: formatDate(profile.membershipExpiryDate) },
              { label: 'Validity', value: `${profile.membershipValidityMonths} months` },
              { label: 'Amount paid', value: formatMoney(profile.amountPaid, profile.currency) },
              { label: 'Coupon', value: displayValue(profile.couponApplied) },
              { label: 'Payment status', value: profile.paymentStatus },
            ]}
          />
        </div>
      </div>
      {payments?.length > 0 && (
        <div className="section-card mt-6">
          <div className="section-header">Payments</div>
          <div className="section-body">
            {payments.map((row) => (
              <p key={row.razorpayOrderId} className="ds-body mb-2">
                {formatDate(row.createdAt)} · {formatMoney(row.amount, row.currency)} ·{' '}
                <PaymentStatusBadge status={row.status} /> · {row.razorpayOrderId}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PrintSummary
