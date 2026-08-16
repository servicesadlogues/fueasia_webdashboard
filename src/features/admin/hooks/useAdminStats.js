import { useEffect, useState } from 'react'
import { getAdminStats } from '../../../services/adminApi'

export const useAdminStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.stats))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading }
}
