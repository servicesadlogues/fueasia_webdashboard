import { createHttpClient } from './createHttpClient'

const http = createHttpClient({
  refreshPath: '/auth/refresh',
  skipRefresh: (url) => /\/auth\/(refresh|request-otp|verify-otp|logout)/.test(url),
  sessionScope: 'member',
})

export { API_BASE_URL } from './apiConfig'
export default http
