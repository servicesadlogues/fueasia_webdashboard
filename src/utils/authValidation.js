export const MEMBERSHIP_ID_RE = /^FUEGLOBAL(?:SUN)?\d{4}\d+$/i

export const normalizeMembershipId = (value) => String(value || '').trim().toUpperCase()

export const validateMembershipId = (value) => {
  const id = normalizeMembershipId(value)
  if (!id) return 'Membership ID is required.'
  if (!MEMBERSHIP_ID_RE.test(id)) return 'Enter a valid Membership ID.'
  return ''
}

export const validateOtp = (value) => {
  const otp = String(value || '').replace(/\D/g, '')
  if (otp.length !== 6) return 'Enter the 6-digit OTP.'
  return ''
}
