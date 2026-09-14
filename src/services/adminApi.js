import adminHttp from './adminHttp'
import { localLoader } from './httpFeedback'

export const getAdminStats = () => adminHttp.get('/admin/stats', localLoader)

export const listAdminMembers = (params, config = {}) =>
  adminHttp.get('/admin/members', { params, ...localLoader, ...config })

export const getAdminMember = (membershipId) =>
  adminHttp.get(`/admin/members/${encodeURIComponent(membershipId)}`)

export const getAdminMemberDocuments = (membershipId) =>
  adminHttp.get(`/admin/members/${encodeURIComponent(membershipId)}/documents`, {
    skipErrorToast: true,
  })

export const updateAdminMemberStatus = (membershipId, body) =>
  adminHttp.patch(`/admin/members/${encodeURIComponent(membershipId)}/status`, body, localLoader)

export const notifyAdminMember = (membershipId, type) =>
  adminHttp.post(`/admin/members/${encodeURIComponent(membershipId)}/notify`, { type }, localLoader)

export const exportAdminMembers = (params) =>
  adminHttp.get('/admin/members/export', { params })

export const listAdminConferences = () => adminHttp.get('/admin/conferences', localLoader)

export const createAdminConference = (formData) =>
  adminHttp.post('/admin/conferences', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...localLoader,
  })

export const updateAdminConference = (id, body) =>
  adminHttp.patch(`/admin/conferences/${id}`, body, localLoader)

export const deleteAdminConference = (id) =>
  adminHttp.delete(`/admin/conferences/${id}`, localLoader)

export const listAdminCoupons = () => adminHttp.get('/admin/coupons', localLoader)

export const createAdminCoupon = (body) =>
  adminHttp.post('/admin/coupons', body, localLoader)

export const updateAdminCoupon = (id, body) =>
  adminHttp.patch(`/admin/coupons/${id}`, body, localLoader)

export const listAdminSpeakers = (params, config = {}) =>
  adminHttp.get('/admin/speakers', { params, ...localLoader, ...config })

export const getAdminSpeaker = (id) =>
  adminHttp.get(`/admin/speakers/${encodeURIComponent(id)}`)

export const getAdminSpeakerDocuments = (id) =>
  adminHttp.get(`/admin/speakers/${encodeURIComponent(id)}/documents`, {
    skipErrorToast: true,
  })
