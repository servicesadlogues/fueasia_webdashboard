const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COUPON_RE = /^[A-Z0-9]{4,50}$/
const MEMBERSHIP_ID_RE = /^FUEGLOBAL(?:SUN)?\d{4}\d+$/i

export const validateConferenceForm = (form) => {
  const title = String(form.title || '').trim()
  if (title.length < 2) return 'Conference title is required.'
  if (title.length > 200) return 'Title is too long.'
  const fee = Number(form.fee)
  if (!Number.isFinite(fee) || fee < 0) return 'Fee must be a non-negative number.'
  const startDate = String(form.startDate || '')
  const endDate = String(form.endDate || '')
  if (startDate && endDate && endDate < startDate) return 'End date cannot be before the start date.'
  return ''
}

export const validateParticipantForm = (form) => {
  const name = String(form.name || '').trim()
  if (name.length < 2) return 'Participant name is required.'
  const email = String(form.email || '').trim()
  if (!EMAIL_RE.test(email)) return 'A valid email is required.'
  const membershipId = String(form.membershipId || '').trim()
  if (membershipId && !MEMBERSHIP_ID_RE.test(membershipId)) {
    return 'Enter a valid Membership ID or leave it blank.'
  }
  const amountPaid = Number(form.amountPaid)
  if (!Number.isFinite(amountPaid) || amountPaid < 0) return 'Amount paid must be a non-negative number.'
  return ''
}

export const validateCouponForm = (form) => {
  const code = String(form.code || '').trim().toUpperCase()
  if (!COUPON_RE.test(code)) return 'Coupon code must be 4–50 letters or numbers.'
  const discountPercent = Number(form.discountPercent)
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    return 'Discount must be between 0 and 100.'
  }
  return ''
}

export const validateCmsForm = ({ title, linkUrl, file }) => {
  if (String(title || '').trim().length < 2) return 'Title is required.'
  const url = String(linkUrl || '').trim()
  if (url) {
    try {
      const parsed = new URL(url)
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return 'Link URL must start with http:// or https://.'
      }
    } catch {
      return 'Link URL must start with http:// or https://.'
    }
  }
  if (!file) return 'Choose an image.'
  const name = String(file.name || '').toLowerCase()
  if (!/\.(jpe?g|png)$/.test(name)) return 'Upload a JPG or PNG image.'
  if (file.size > 5 * 1024 * 1024) return 'Image must be 5MB or smaller.'
  return ''
}
