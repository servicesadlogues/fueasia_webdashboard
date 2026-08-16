export const validateAdminEmail = (email) => {
  const value = String(email || '').trim()
  if (!value) return 'Email is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.'
  return ''
}

export const validateAdminPassword = (password) => {
  if (!String(password || '')) return 'Password is required.'
  return ''
}

export const validateNewAdminPassword = (password, confirmPassword) => {
  const raw = String(password || '')
  if (raw.length < 8 || raw.length > 128) return 'Password must be 8–128 characters.'
  if (!/[A-Za-z]/.test(raw) || !/\d/.test(raw)) return 'Password must include a letter and a number.'
  if (raw !== String(confirmPassword || '')) return 'Passwords do not match.'
  return ''
}
