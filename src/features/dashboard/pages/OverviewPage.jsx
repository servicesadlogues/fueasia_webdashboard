import { Link } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import { downloadBlob } from '../../../utils/download'
import { formatDate } from '../../../utils/formatDate'
import PageHeader from '../../../components/ui/PageHeader'
import StatCard from '../../../components/ui/StatCard'
import { useDashboard } from '../dashboardContext'
import { buildSummaryPayload, formatMoney } from '../utils/labels'
import MembershipCard from '../components/MembershipCard'
import Avatar from '../components/Avatar'
import { MembershipStatusBadge, PaymentStatusBadge } from '../components/StatusBadge'

const downloadJson = (profile, payments) => {
  const payload = buildSummaryPayload(profile, payments)
  downloadBlob(JSON.stringify(payload, null, 2), `${profile.membershipId}-membership.json`, 'application/json')
}

const OverviewPage = () => {
  const { profile, payments, photoUrl } = useDashboard()
  const days = profile.daysRemaining
  const daysHint = days == null
    ? ''
    : days < 0
      ? `Expired ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago`
      : `${days} day${days === 1 ? '' : 's'} remaining`

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    downloadJson(profile, payments)
    notify.success('Membership data downloaded.')
  }

  return (
    <div>
      <PageHeader
        className="ds-no-print"
        actions={(
          <>
            <button type="button" className="btn-outline" onClick={handlePrint}>Download summary</button>
            <button type="button" className="btn-ghost" onClick={handleDownload}>Download data</button>
          </>
        )}
      >
        <div className="flex items-center gap-4">
          <Avatar name={profile.name} src={photoUrl} className="ds-avatar-lg" />
          <div>
            <p className="ds-caption">Welcome back</p>
            <h2 className="ds-display">{profile.name}</h2>
            <p className="ds-muted mt-1">{profile.email}</p>
          </div>
        </div>
      </PageHeader>

      <div className="ds-stat-grid mb-6 ds-no-print">
        <StatCard
          label="Membership"
          value={<MembershipStatusBadge status={profile.membershipStatus} />}
          hint={daysHint}
        />
        <StatCard label="Valid until" value={formatDate(profile.membershipExpiryDate)} hint={`${profile.membershipValidityMonths} months`} />
        <StatCard
          label="Amount paid"
          value={formatMoney(profile.amountPaid, profile.currency)}
          hint={profile.couponApplied ? `Coupon ${profile.couponApplied}` : 'No coupon'}
        />
        <StatCard
          label="Payment"
          value={<PaymentStatusBadge status={profile.paymentStatus} />}
          hint={payments[0]?.razorpayOrderId || 'Registration payment'}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5 ds-no-print">
        <div className="lg:col-span-3">
          <MembershipCard profile={profile} />
        </div>
        <div className="section-card mb-0 lg:col-span-2">
          <div className="section-header">Quick links</div>
          <div className="section-body flex flex-col gap-3">
            <Link className="ds-link no-underline" to="/home/profile">View submitted profile</Link>
            <Link className="ds-link no-underline" to="/home/membership">Membership details</Link>
            <Link className="ds-link no-underline" to="/home/payments">Track payment status</Link>
            <Link className="ds-link no-underline" to="/home/documents">Open uploaded documents</Link>
            <p className="ds-caption mt-2">
              Documents were optional at registration. If a file is missing, it was not uploaded.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
