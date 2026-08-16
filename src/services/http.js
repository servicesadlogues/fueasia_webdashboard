import { createHttpClient, persistKeys, clearKeys } from './createHttpClient'

export { API_BASE_URL } from './apiConfig'

export const MEMBER_TOKEN_KEY = 'fue_member_token'
export const MEMBER_REFRESH_KEY = 'fue_member_refresh'

export const persistMemberSession = persistKeys(MEMBER_TOKEN_KEY, MEMBER_REFRESH_KEY)
export const clearMemberSession = clearKeys(MEMBER_TOKEN_KEY, MEMBER_REFRESH_KEY)

const http = createHttpClient({
  tokenKey: MEMBER_TOKEN_KEY,
  refreshKey: MEMBER_REFRESH_KEY,
  persist: persistMemberSession,
  clear: clearMemberSession,
  refreshPath: '/auth/refresh',
  skipRefresh: (url) => /\/auth\/(refresh|request-otp|verify-otp|logout)/.test(url),
})

export default http
