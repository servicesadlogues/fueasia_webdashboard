const NATIONAL_LENGTH = {
  1: { min: 10, max: 10 },
  7: { min: 10, max: 10 },
  20: { min: 10, max: 10 },
  27: { min: 9, max: 9 },
  31: { min: 9, max: 9 },
  32: { min: 9, max: 9 },
  33: { min: 9, max: 9 },
  34: { min: 9, max: 9 },
  39: { min: 9, max: 10 },
  41: { min: 9, max: 9 },
  44: { min: 10, max: 10 },
  46: { min: 9, max: 10 },
  47: { min: 8, max: 8 },
  48: { min: 9, max: 9 },
  49: { min: 10, max: 11 },
  52: { min: 10, max: 10 },
  54: { min: 10, max: 10 },
  55: { min: 10, max: 11 },
  60: { min: 9, max: 10 },
  61: { min: 9, max: 9 },
  62: { min: 9, max: 12 },
  63: { min: 10, max: 10 },
  64: { min: 8, max: 10 },
  65: { min: 8, max: 8 },
  66: { min: 9, max: 9 },
  81: { min: 10, max: 10 },
  82: { min: 9, max: 11 },
  84: { min: 9, max: 10 },
  86: { min: 11, max: 11 },
  90: { min: 10, max: 10 },
  91: { min: 10, max: 10 },
  92: { min: 10, max: 10 },
  94: { min: 9, max: 9 },
  351: { min: 9, max: 9 },
  852: { min: 8, max: 8 },
  880: { min: 10, max: 10 },
  960: { min: 7, max: 7 },
  966: { min: 9, max: 9 },
  968: { min: 8, max: 8 },
  971: { min: 9, max: 9 },
  973: { min: 8, max: 8 },
  974: { min: 8, max: 8 },
  975: { min: 8, max: 8 },
  977: { min: 10, max: 10 },
}

const DEFAULT_LENGTH = { min: 7, max: 15 }

export const normalizeDialCode = (value) => {
  const digits = String(value || '').replace(/\D/g, '')
  return digits || '91'
}

export const formatCountryCode = (value) => `+${normalizeDialCode(value)}`

const lengthForDial = (dial) => NATIONAL_LENGTH[dial] || DEFAULT_LENGTH

export const nationalDigits = (mobile, countryCode) => {
  const dial = normalizeDialCode(countryCode)
  const digits = String(mobile || '').replace(/\D/g, '')
  const { min, max } = lengthForDial(dial)

  // If digits are already of valid national length (between min and max), don't strip dial code
  if (digits.length >= min && digits.length <= max) {
    return digits
  }

  // If digits start with dial code and stripping it yields a valid length
  if (digits.startsWith(dial) && digits.length > dial.length) {
    const stripped = digits.slice(dial.length)
    if (stripped.length >= min) {
      return stripped
    }
  }

  return digits
}

const mobileErrorMessage = (min, max) =>
  min === max
    ? `Enter a valid ${min}-digit mobile number.`
    : `Enter a valid mobile number (${min}–${max} digits).`

export const validateMobileNumber = (mobile, countryCode) => {
  const dial = normalizeDialCode(countryCode)
  const national = nationalDigits(mobile, dial)
  const { min, max } = lengthForDial(dial)
  if (!national || national.length < min || national.length > max) {
    return mobileErrorMessage(min, max)
  }
  return ''
}
