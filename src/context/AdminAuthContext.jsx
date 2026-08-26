import { getAdminMe, logoutAdmin, adminTokenStore } from '../services/adminHttp'
import { createAuthProvider } from './createAuthProvider'

const { Provider, useAuthHook } = createAuthProvider({
  fetchMe: getAdminMe,
  logoutApi: logoutAdmin,
  userFromMe: (res) => res.admin,
  userFromLogin: (session) => session.admin,
  userKey: 'admin',
  hookName: 'useAdminAuth',
  hasStoredSession: () => adminTokenStore.hasSession(),
})

export const AdminAuthProvider = Provider
export const useAdminAuth = useAuthHook
