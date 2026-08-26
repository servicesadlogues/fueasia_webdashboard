import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { onSessionExpiredEvent } from '../services/createHttpClient'

export const createAuthProvider = ({
  fetchMe,
  logoutApi,
  userFromMe,
  userFromLogin,
  userKey,
  hookName,
}) => {
  const Context = createContext(null)

  const Provider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const logout = useCallback(() => {
      logoutApi().catch(() => {})
      setUser(null)
    }, [logoutApi])

    const login = useCallback((session) => {
      setUser(userFromLogin(session))
    }, [userFromLogin])

    const updateUser = useCallback((updater) => {
      setUser((prev) => {
        if (!prev) return prev
        const patch = typeof updater === 'function' ? updater(prev) : updater
        return { ...prev, ...patch }
      })
    }, [])

    useEffect(() => {
      return onSessionExpiredEvent((scope) => {
        if (scope === userKey) setUser(null)
      })
    }, [userKey])

    useEffect(() => {
      let cancelled = false
      setLoading(true)
      fetchMe()
        .then((res) => {
          if (!cancelled) setUser(userFromMe(res))
        })
        .catch(() => {
          if (!cancelled) setUser(null)
        })
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
      return () => { cancelled = true }
    }, [fetchMe, userFromMe])

    const value = useMemo(
      () => ({
        [userKey]: user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser,
      }),
      [user, loading, login, logout, updateUser, userKey]
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
