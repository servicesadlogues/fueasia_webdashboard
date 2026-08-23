import { Link } from 'react-router-dom'
import { Calendar, CreditCard, IdCard } from 'lucide-react'
import { formatDate } from '../../../utils/formatDate'
import { Button, PageHeader, SectionCard, StatCard } from '../../../components/ui'
import { useDashboard } from '../dashboardContext'
import { formatMoney } from '../utils/labels'
import MembershipCard from '../components/MembershipCard'
import Avatar from '../components/Avatar'
import { MembershipStatusBadge, PaymentStatusBadge } from '../components/StatusBadge'

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

  return (
    <>
      <PageHeader
        className="ds-no-print"
        actions={(
          <Button variant="outline" onClick={handlePrint}>Download summary</Button>
        )}
      >
        <div className="flex items-center gap-4">
          <Avatar name={profile.name} src={photoUrl} className="ds-avatar-lg" />
          <div>
            <p className="ds-caption uppercase tracking-wider text-[var(--color-primary)]">Welcome back</p>
            <h2 className="ds-display">{profile.name}</h2>
            <p className="ds-muted mt-1">{profile.email}</p>
          </div>
        </div>
      </PageHeader>

      <div className="ds-stat-grid mb-6 ds-no-print">
        <StatCard
          label="Membership"
          icon={IdCard}
          value={<MembershipStatusBadge status={profile.membershipStatus} />}
          hint={daysHint}
        />
        <StatCard label="Valid until" icon={Calendar} value={formatDate(profile.membershipExpiryDate)} hint={`${profile.membershipValidityMonths} months`} />
        <StatCard
          label="Amount paid"
          icon={CreditCard}
          value={formatMoney(profile.amountPaid, profile.currency)}
          hint="Registration payment"
        />
        <StatCard
          label="Payment"
          icon={CreditCard}
          value={<PaymentStatusBadge status={profile.paymentStatus} />}
          hint={payments[0]?.razorpayOrderId || 'Registration payment'}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5 ds-no-print">
        <div className="lg:col-span-3">
          <MembershipCard profile={profile} />
        </div>
        <SectionCard title="Quick links" className="mb-0 lg:col-span-2">
          <div className="flex flex-col gap-3">
            <Link className="ds-link no-underline font-medium" to="/home/profile">View submitted profile</Link>
            <Link className="ds-link no-underline font-medium" to="/home/membership">Membership details</Link>
            <Link className="ds-link no-underline font-medium" to="/home/payments">Track payment status</Link>
            <Link className="ds-link no-underline font-medium" to="/home/documents">Open uploaded documents</Link>
            <Link className="ds-link no-underline font-medium" to="/home/events">Upcoming events</Link>
            <p className="ds-caption mt-2">
              Documents were optional at registration. If a file is missing, it was not uploaded.
            </p>
          </div>
        </SectionCard>
      </div>
    </>
  )
}

export default OverviewPage
