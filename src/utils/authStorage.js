const LEGACY_TOKEN_KEYS = [
  'fue_member_token',
  'fue_member_refresh',
  'fue_admin_token',
  'fue_admin_refresh',
]

export const clearLegacyTokenStorage = () => {
  LEGACY_TOKEN_KEYS.forEach((key) => localStorage.removeItem(key))
}
