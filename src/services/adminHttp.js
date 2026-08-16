import { createHttpClient, persistKeys, clearKeys } from './createHttpClient'

export const ADMIN_TOKEN_KEY = 'fue_admin_token'
export const ADMIN_REFRESH_KEY = 'fue_admin_refresh'

export const persistAdminSession = persistKeys(ADMIN_TOKEN_KEY, ADMIN_REFRESH_KEY)
export const clearAdminSession = clearKeys(ADMIN_TOKEN_KEY, ADMIN_REFRESH_KEY)

const adminHttp = createHttpClient({
  tokenKey: ADMIN_TOKEN_KEY,
  refreshKey: ADMIN_REFRESH_KEY,
  persist: persistAdminSession,
  clear: clearAdminSession,
  refreshPath: '/admin/auth/refresh',
  skipRefresh: (url) => /\/admin\/auth\/(refresh|login|forgot-password|reset-password|logout)/.test(url),
})

export const loginAdmin = (email, password) =>
  adminHttp.post('/admin/auth/login', { email, password }, { skipErrorToast: true })

export const forgotAdminPassword = (email) =>
  adminHttp.post('/admin/auth/forgot-password', { email }, { skipErrorToast: true })

export const resetAdminPassword = (token, password, confirmPassword) =>
  adminHttp.post('/admin/auth/reset-password', { token, password, confirmPassword }, { skipErrorToast: true })

export const getAdminMe = () => adminHttp.get('/admin/auth/me', { silent: true, skipErrorToast: true })

export const logoutAdmin = (refreshToken) =>
  adminHttp.post('/admin/auth/logout', { refreshToken }, { silent: true, skipErrorToast: true })

export default adminHttp
