import { createHttpClient } from './createHttpClient'
import { createSessionTokenStore } from '../utils/sessionTokens'

export const MEMBER_TOKEN_KEY = 'fue_member_token'
export const MEMBER_REFRESH_KEY = 'fue_member_refresh'

export const memberTokenStore = createSessionTokenStore(MEMBER_TOKEN_KEY, MEMBER_REFRESH_KEY)

const http = createHttpClient({
  tokenStore: memberTokenStore,
  refreshPath: '/auth/refresh',
  skipRefresh: (url) => /\/auth\/(refresh|request-otp|verify-otp|logout)/.test(url),
  sessionScope: 'member',
})

export { API_BASE_URL } from './apiConfig'
export default http
