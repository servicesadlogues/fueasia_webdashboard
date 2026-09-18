import { createHttpClient } from './createHttpClient'
import { localLoader } from './httpFeedback'
import { createSessionTokenStore } from '../utils/sessionTokens'

export const ADMIN_TOKEN_KEY = 'fue_admin_token'
export const ADMIN_REFRESH_KEY = 'fue_admin_refresh'

export const adminTokenStore = createSessionTokenStore(ADMIN_TOKEN_KEY, ADMIN_REFRESH_KEY)

const adminHttp = createHttpClient({
  tokenStore: adminTokenStore,
  refreshPath: '/admin/auth/refresh',
  skipRefresh: (url) => /\/admin\/auth\/(refresh|login|forgot-password|reset-password|logout)/.test(url),
  sessionScope: 'admin',
})

export const loginAdmin = (email, password) =>
  adminHttp.post('/admin/auth/login', { email, password }, { skipErrorToast: true, ...localLoader })

export const forgotAdminPassword = (email) =>
  adminHttp.post('/admin/auth/forgot-password', { email }, { skipErrorToast: true })

export const resetAdminPassword = (token, password, confirmPassword) =>
  adminHttp.post('/admin/auth/reset-password', { token, password, confirmPassword }, { skipErrorToast: true })

export const getAdminMe = () => adminHttp.get('/admin/auth/me', { silent: true, skipErrorToast: true })

export const logoutAdmin = () =>
  adminHttp
    .post('/admin/auth/logout', { refreshToken: adminTokenStore.getRefresh() }, { silent: true, skipErrorToast: true })
    .finally(() => adminTokenStore.clear())

export default adminHttp
