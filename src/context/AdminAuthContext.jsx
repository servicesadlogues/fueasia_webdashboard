import {
  ADMIN_REFRESH_KEY,
  ADMIN_TOKEN_KEY,
  clearAdminSession,
  getAdminMe,
  logoutAdmin,
  persistAdminSession,
} from '../services/adminHttp'
import { createAuthProvider } from './createAuthProvider'

const { Provider, useAuthHook } = createAuthProvider({
  accessKey: ADMIN_TOKEN_KEY,
  refreshKey: ADMIN_REFRESH_KEY,
  persist: persistAdminSession,
  clear: clearAdminSession,
  fetchMe: getAdminMe,
  logoutApi: logoutAdmin,
  userFromMe: (res) => res.admin,
  userFromLogin: (session) => session.admin,
  userKey: 'admin',
  hookName: 'useAdminAuth',
})

export const AdminAuthProvider = Provider
export const useAdminAuth = useAuthHook
