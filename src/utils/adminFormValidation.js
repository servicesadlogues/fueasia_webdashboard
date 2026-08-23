const COUPON_RE = /^[A-Z0-9]{4,50}$/

export const validateConferenceForm = (form) => {
  const registrationLink = String(form.registrationLink || '').trim()
  if (!registrationLink) return 'Registration link is required.'
  if (registrationLink.startsWith('/')) {
    if (registrationLink.length > 500) return 'Registration link is too long.'
    return ''
  }
  try {
    const parsed = new URL(registrationLink)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return 'Registration link must start with http://, https://, or /.'
    }
  } catch {
    return 'Registration link must start with http://, https://, or /.'
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
