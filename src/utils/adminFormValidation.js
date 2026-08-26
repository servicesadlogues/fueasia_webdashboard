import { isInternalPath } from './urls'

const COUPON_RE = /^[A-Z0-9]{4,50}$/

export const validateConferenceForm = (form) => {
  const title = String(form.title || '').trim()
  if (!title) return 'Event name is required.'
  if (title.length > 200) return 'Event name is too long.'

  const startDate = String(form.startDate || '').trim()
  if (!startDate) return 'Date is required.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || Number.isNaN(new Date(`${startDate}T00:00:00Z`).getTime())) {
    return 'Date must be a valid date.'
  }

  const location = String(form.location || '').trim()
  if (!location) return 'Venue is required.'
  if (location.length > 200) return 'Venue is too long.'

  const registrationLink = String(form.registrationLink || '').trim()
  if (!registrationLink) return 'Registration link is required.'
  if (registrationLink.startsWith('//')) return 'Registration link is invalid.'
  if (registrationLink.startsWith('/')) {
    if (!isInternalPath(registrationLink)) return 'Registration link must be a valid internal path.'
    if (registrationLink.length > 500) return 'Registration link is too long.'
  } else {
    try {
      const parsed = new URL(registrationLink)
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return 'Registration link must start with http://, https://, or /.'
      }
    } catch {
      return 'Registration link must start with http://, https://, or /.'
    }
  }
  if (!form.headerImage) return 'Header image is required.'
  if (!form.bodyImage) return 'Body image is required.'
  for (const file of [form.headerImage, form.bodyImage]) {
    const name = String(file.name || '').toLowerCase()
    if (!/\.(jpe?g|png)$/.test(name)) return 'Upload JPG or PNG images only.'
    if (file.size > 5 * 1024 * 1024) return 'Each image must be 5MB or smaller.'
  }
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
