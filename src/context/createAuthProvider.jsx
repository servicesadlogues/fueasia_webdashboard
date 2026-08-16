import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const createAuthProvider = ({
  accessKey,
  refreshKey,
  persist,
  clear,
  fetchMe,
  logoutApi,
  userFromMe,
  userFromLogin,
  userKey,
  hookName,
}) => {
  const Context = createContext(null)

  const Provider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem(accessKey) || '')
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(
      !!localStorage.getItem(accessKey) || !!localStorage.getItem(refreshKey)
    )

    const logout = useCallback(() => {
      const refreshToken = localStorage.getItem(refreshKey)
      if (refreshToken) logoutApi(refreshToken).catch(() => {})
      clear()
      setToken('')
      setUser(null)
    }, [])

    const login = useCallback((session) => {
      persist(session)
      setToken(session.accessToken)
      setUser(userFromLogin(session))
    }, [])

    useEffect(() => {
      const access = localStorage.getItem(accessKey)
      const refresh = localStorage.getItem(refreshKey)
      if (!access && !refresh) {
        setLoading(false)
        return undefined
      }
      let cancelled = false
      setLoading(true)
      fetchMe()
        .then((res) => {
          if (!cancelled) {
            setUser(userFromMe(res))
            setToken(localStorage.getItem(accessKey) || '')
          }
        })
        .catch(() => {
          if (!cancelled) logout()
        })
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
      return () => { cancelled = true }
    }, [logout])

    const value = useMemo(
      () => ({
        token,
        [userKey]: user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
      }),
      [token, user, loading, login, logout]
    )

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  const useAuthHook = () => {
    const ctx = useContext(Context)
    if (!ctx) throw new Error(`${hookName} must be used inside its provider`)
    return ctx
  }

  return { Provider, useAuthHook }
}
