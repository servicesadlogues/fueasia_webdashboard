import { createHttpClient } from './createHttpClient'

const adminHttp = createHttpClient({
  refreshPath: '/admin/auth/refresh',
  skipRefresh: (url) => /\/admin\/auth\/(refresh|login|forgot-password|reset-password|logout)/.test(url),
  sessionScope: 'admin',
})

export const loginAdmin = (email, password) =>
  adminHttp.post('/admin/auth/login', { email, password }, { skipErrorToast: true })

export const forgotAdminPassword = (email) =>
  adminHttp.post('/admin/auth/forgot-password', { email }, { skipErrorToast: true })

export const resetAdminPassword = (token, password, confirmPassword) =>
  adminHttp.post('/admin/auth/reset-password', { token, password, confirmPassword }, { skipErrorToast: true })

export const getAdminMe = () => adminHttp.get('/admin/auth/me', { silent: true, skipErrorToast: true })

export const logoutAdmin = () =>
  adminHttp.post('/admin/auth/logout', {}, { silent: true, skipErrorToast: true })

export default adminHttp
