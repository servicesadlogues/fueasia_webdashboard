import { useEffect, useMemo, useState } from 'react'
import { getAdminStats } from '../../services/adminApi'
import { AdminStatsContext } from './adminStatsContext'

export const AdminStatsProvider = ({ children }) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getAdminStats()
      .then((res) => {
        if (!cancelled) setStats(res.stats)
      })
      .catch(() => {
        if (!cancelled) setStats(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const value = useMemo(() => ({ stats, loading }), [stats, loading])

  return (
    <AdminStatsContext.Provider value={value}>
      {children}
    </AdminStatsContext.Provider>
  )
}
