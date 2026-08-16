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

export const createAdminConference = (body) => adminHttp.post('/admin/conferences', body)

export const updateAdminConference = (id, body) => adminHttp.patch(`/admin/conferences/${id}`, body)

export const getAdminConferenceRegistrations = (id) =>
  adminHttp.get(`/admin/conferences/${id}/registrations`)

export const addAdminConferenceRegistration = (id, body) =>
  adminHttp.post(`/admin/conferences/${id}/registrations`, body)

export const listAdminCms = (kind) => adminHttp.get('/admin/cms', { params: kind ? { kind } : {} })

export const createAdminCms = (formData) =>
  adminHttp.post('/admin/cms', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const updateAdminCms = (id, body) => adminHttp.patch(`/admin/cms/${id}`, body)

export const deleteAdminCms = (id) => adminHttp.delete(`/admin/cms/${id}`)

export const listAdminCoupons = () => adminHttp.get('/admin/coupons')

export const createAdminCoupon = (body) => adminHttp.post('/admin/coupons', body)

export const updateAdminCoupon = (id, body) => adminHttp.patch(`/admin/coupons/${id}`, body)
