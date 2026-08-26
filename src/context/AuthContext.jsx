import { getMemberMe, logoutMember } from '../services/api'
import { createAuthProvider } from './createAuthProvider'

const { Provider, useAuthHook } = createAuthProvider({
  fetchMe: getMemberMe,
  logoutApi: logoutMember,
  userFromMe: (res) => res.member,
  userFromLogin: (session) => session.member,
  userKey: 'member',
  hookName: 'useAuth',
})

export const AuthProvider = Provider
export const useAuth = useAuthHook
