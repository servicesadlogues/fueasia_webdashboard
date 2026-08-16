import { SPECIALITY_LABELS, MEMBER_TYPE_LABELS, PAYMENT_STATUS_LABELS } from '../../dashboard/utils/labels'

const MemberFilters = ({ value, onChange, search, onSearchChange, showType = true }) => {
  const set = (key) => (e) => onChange({ ...value, [key]: e.target.value, page: 1 })

  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input
        className="input-field sm:col-span-2 lg:col-span-1"
        placeholder="Search name, email, ID"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search members"
      />
      {showType ? (
        <select className="input-field" value={value.memberType || ''} onChange={set('memberType')} aria-label="Member type">
          <option value="">All types</option>
          {Object.entries(MEMBER_TYPE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      ) : null}
      <select className="input-field" value={value.paymentStatus || ''} onChange={set('paymentStatus')} aria-label="Payment status">
        <option value="">All payment statuses</option>
        {['success', 'pending', 'failed'].map((key) => (
          <option key={key} value={key}>{PAYMENT_STATUS_LABELS[key]}</option>
        ))}
      </select>
      <select className="input-field" value={value.speciality || ''} onChange={set('speciality')} aria-label="Speciality">
        <option value="">All specialities</option>
        {Object.entries(SPECIALITY_LABELS).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  )
}

export default MemberFilters
