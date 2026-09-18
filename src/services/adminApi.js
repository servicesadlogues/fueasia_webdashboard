import adminHttp from './adminHttp'

export const getAdminStats = () => adminHttp.get('/admin/stats')

export const listAdminMembers = (params, config = {}) =>
  adminHttp.get('/admin/members', { params, ...config })

export const getAdminMember = (membershipId) =>
  adminHttp.get(`/admin/members/${encodeURIComponent(membershipId)}`)

export const getAdminMemberDocuments = (membershipId) =>
  adminHttp.get(`/admin/members/${encodeURIComponent(membershipId)}/documents`, {
    skipErrorToast: true,
  })

export const updateAdminMemberStatus = (membershipId, body) =>
  adminHttp.patch(`/admin/members/${encodeURIComponent(membershipId)}/status`, body)

export const notifyAdminMember = (membershipId, type) =>
  adminHttp.post(`/admin/members/${encodeURIComponent(membershipId)}/notify`, { type })

export const exportAdminMembers = (params) =>
  adminHttp.get('/admin/members/export', { params })

export const listAdminConferences = () => adminHttp.get('/admin/conferences')

export const createAdminConference = (formData) =>
  adminHttp.post('/admin/conferences', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const updateAdminConference = (id, body) => adminHttp.patch(`/admin/conferences/${id}`, body)

export const deleteAdminConference = (id) => adminHttp.delete(`/admin/conferences/${id}`)

export const listAdminCoupons = () => adminHttp.get('/admin/coupons')

export const createAdminCoupon = (body) => adminHttp.post('/admin/coupons', body)

export const updateAdminCoupon = (id, body) => adminHttp.patch(`/admin/coupons/${id}`, body)

export const listAdminSpeakers = (params, config = {}) =>
  adminHttp.get('/admin/speakers', { params, ...config })

export const exportAdminSpeakers = (params) =>
  adminHttp.get('/admin/speakers/export', { params })

export const getAdminSpeaker = (id) =>
  adminHttp.get(`/admin/speakers/${encodeURIComponent(id)}`)

export const getAdminSpeakerDocuments = (id) =>
  adminHttp.get(`/admin/speakers/${encodeURIComponent(id)}/documents`, {
    skipErrorToast: true,
  })

export const deleteAdminSpeaker = (id) =>
  adminHttp.delete(`/admin/speakers/${encodeURIComponent(id)}`)
