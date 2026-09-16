import { BRAND_LOGO_URL } from '../../../constants/brand'
import { formatDate } from '../../../utils/formatDate'
import { membershipTypeLabel } from '../../../utils/labels'
import { MembershipStatusBadge } from '../../../components/ui'

const MembershipCard = ({ profile }) => (
  <div className="ds-member-card">
    <div className="relative z-10 flex h-full flex-col justify-between gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={BRAND_LOGO_URL} alt="" className="h-10 w-auto object-contain" />
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60">Member card</p>
            <p className="text-sm font-semibold">{membershipTypeLabel(profile.memberType)}</p>
          </div>
        </div>
        <MembershipStatusBadge status={profile.membershipStatus} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-white/60">Membership ID</p>
        <p className="mt-1 text-2xl font-bold tracking-wide text-primary">{profile.membershipId}</p>
        <p className="mt-3 text-lg font-semibold">{profile.name}</p>
        <p className="mt-1 text-xs text-white/70">
          Valid {formatDate(profile.membershipStartDate)} - {formatDate(profile.membershipExpiryDate)}
        </p>
      </div>
    </div>
  </div>
)

export default MembershipCard
