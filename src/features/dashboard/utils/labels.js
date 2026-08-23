export const MEMBER_TYPE_LABELS = {
  fueglobal: 'FUE Global',
  sunpharma: 'Sun Pharma',
}

export const SPECIALITY_LABELS = {
  dermatologist: 'Dermatologist',
  plastic_surgeon: 'Plastic Surgeon',
  other: 'Other',
}

export const PAYMENT_STATUS_LABELS = {
  success: 'Success',
  pending: 'Pending',
  failed: 'Failed',
  created: 'Created',
}

export const MEMBERSHIP_STATUS_LABELS = {
  active: 'Active',
  expiring: 'Expiring soon',
  expired: 'Expired',
  inactive: 'Inactive',
}

export const displayValue = (value) => {
  if (value == null || value === '') return '—'
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—'
  return String(value)
}

export const formatMoney = (amount, currency = 'USD') => {
  const n = Number(amount)
  if (Number.isNaN(n)) return '—'
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n)
  } catch {
    return `${currency} ${n.toFixed(2)}`
  }
}

export const initials = (name = '') => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return 'FG'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export const specialityLabel = (profile) => {
  if (!profile?.speciality) return '—'
  if (profile.speciality === 'other') return profile.specialityOther || 'Other'
  return SPECIALITY_LABELS[profile.speciality] || profile.speciality
}

export const membershipTypeLabel = (type) => MEMBER_TYPE_LABELS[type] || type || '—'
