export const createSessionTokenStore = (accessKey, refreshKey) => ({
  getAccess: () => sessionStorage.getItem(accessKey) || '',
  getRefresh: () => sessionStorage.getItem(refreshKey) || '',
  hasSession: () => Boolean(sessionStorage.getItem(accessKey) || sessionStorage.getItem(refreshKey)),
  set: (accessToken, refreshToken) => {
    if (accessToken) sessionStorage.setItem(accessKey, accessToken)
    if (refreshToken) sessionStorage.setItem(refreshKey, refreshToken)
  },
  clear: () => {
    sessionStorage.removeItem(accessKey)
    sessionStorage.removeItem(refreshKey)
  },
})
