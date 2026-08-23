import { useCallback, useEffect, useMemo, useState } from 'react'
import { getDashboardDocuments, getDashboardPayments, getDashboardProfile, listMemberEvents, updateMemberProfile, deleteMemberDocument } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { DashboardContext } from './dashboardContext'

export const DashboardProvider = ({ children }) => {
  const { updateUser } = useAuth()
  const [profile, setProfile] = useState(null)
  const [payments, setPayments] = useState([])
  const [documents, setDocuments] = useState({ items: [] })
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [profileRes, paymentRes, documentRes, eventsRes] = await Promise.allSettled([
        getDashboardProfile(),
        getDashboardPayments(),
        getDashboardDocuments(),
        listMemberEvents(),
      ])
      if (profileRes.status !== 'fulfilled') {
        throw profileRes.reason || new Error('Could not load your profile.')
      }
      setProfile(profileRes.value.profile)
      setPayments(paymentRes.status === 'fulfilled' ? paymentRes.value.payments || [] : [])
      setDocuments(documentRes.status === 'fulfilled' ? documentRes.value.documents || { items: [] } : { items: [] })
      setEvents(eventsRes.status === 'fulfilled' ? eventsRes.value.events || [] : [])
    } catch (err) {
      setError(err.message || 'Could not load your dashboard.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  const handleUpdateProfile = useCallback(async (data) => {
    const res = await updateMemberProfile(data)
    if (res?.profile) {
      setProfile(res.profile)
      if (updateUser) {
        updateUser({
          name: res.profile.name,
          email: res.profile.email,
        })
      }
      getDashboardDocuments().then((docRes) => {
        if (docRes?.documents) setDocuments(docRes.documents)
      }).catch(() => {})
    }
    return res
  }, [updateUser])

  const photoUrl = useMemo(() => {
    if (profile?.photoUrl) return profile.photoUrl
    const fromDocs = documents.items?.find((item) => item.key === 'profilePic')
    if (fromDocs && /\.(jpe?g|png)$/i.test(fromDocs.fileName || '')) return fromDocs.url
    return ''
  }, [profile, documents])

  const handleDeleteDocument = useCallback(async (key) => {
    const res = await deleteMemberDocument(key)
    if (res?.documents) setDocuments(res.documents)
    if (res?.profile) setProfile(res.profile)
    return res
  }, [])

  const value = useMemo(
    () => ({
      profile,
      payments,
      documents,
      events,
      photoUrl,
      loading,
      error,
      reload,
      updateProfile: handleUpdateProfile,
      deleteDocument: handleDeleteDocument,
    }),
    [profile, payments, documents, events, photoUrl, loading, error, reload, handleUpdateProfile, handleDeleteDocument]
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
