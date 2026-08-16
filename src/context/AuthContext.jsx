import {
  getMemberMe,
  MEMBER_TOKEN_KEY,
  MEMBER_REFRESH_KEY,
  persistMemberSession,
  clearMemberSession,
  logoutMember,
} from '../services/api'
import { createAuthProvider } from './createAuthProvider'

const { Provider, useAuthHook } = createAuthProvider({
  accessKey: MEMBER_TOKEN_KEY,
  refreshKey: MEMBER_REFRESH_KEY,
  persist: persistMemberSession,
  clear: clearMemberSession,
  fetchMe: getMemberMe,
  logoutApi: logoutMember,
  userFromMe: (res) => res.member,
  userFromLogin: (session) => session.member,
  userKey: 'member',
  hookName: 'useAuth',
})

export const AuthProvider = Provider
export const useAuth = useAuthHook
