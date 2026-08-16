import { useCallback, useEffect, useMemo, useState } from 'react'
import { getDashboardDocuments, getDashboardPayments, getDashboardProfile } from '../../services/api'
import { DashboardContext } from './dashboardContext'

export const DashboardProvider = ({ children }) => {
  const [profile, setProfile] = useState(null)
  const [payments, setPayments] = useState([])
  const [documents, setDocuments] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [profileRes, paymentRes, documentRes] = await Promise.allSettled([
        getDashboardProfile(),
        getDashboardPayments(),
        getDashboardDocuments(),
      ])
      if (profileRes.status !== 'fulfilled') {
        throw profileRes.reason || new Error('Could not load your profile.')
      }
      setProfile(profileRes.value.profile)
      setPayments(paymentRes.status === 'fulfilled' ? paymentRes.value.payments || [] : [])
      setDocuments(documentRes.status === 'fulfilled' ? documentRes.value.documents || { items: [] } : { items: [] })
    } catch (err) {
      setError(err.message || 'Could not load your dashboard.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const photoUrl = useMemo(() => {
    if (profile?.photoUrl) return profile.photoUrl
    const fromDocs = documents.items?.find((item) => item.key === 'profilePic')
    if (fromDocs && /\.(jpe?g|png)$/i.test(fromDocs.fileName || '')) return fromDocs.url
    return ''
  }, [profile, documents])

  const value = useMemo(
    () => ({ profile, payments, documents, photoUrl, loading, error, reload }),
    [profile, payments, documents, photoUrl, loading, error, reload]
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
