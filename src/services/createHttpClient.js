import axios from 'axios'
import { API_BASE_URL } from './apiConfig'
import {
  startRequestFeedback,
  finishRequestFeedback,
  toastApiError,
  toastApiSuccess,
  apiErrorMessage,
  isRequestCanceled,
} from './httpFeedback'

const SESSION_EXPIRED = 'Session expired. Please log in again.'

export const createHttpClient = ({ tokenKey, refreshKey, persist, clear, refreshPath, skipRefresh }) => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
  })

  let refreshInFlight = null

  const refreshAccessToken = () => {
    const refreshToken = localStorage.getItem(refreshKey)
    if (!refreshToken) return Promise.reject(new Error('No refresh token'))
    if (!refreshInFlight) {
      refreshInFlight = axios
        .post(`${API_BASE_URL}${refreshPath}`, { refreshToken }, { timeout: 30000 })
        .then((res) => {
          persist(res.data)
          return res.data
        })
        .finally(() => {
          refreshInFlight = null
        })
    }
    return refreshInFlight
  }

  client.interceptors.request.use((config) => {
    const next = startRequestFeedback(config)
    const token = localStorage.getItem(tokenKey)
    if (token) {
      next.headers = next.headers || {}
      next.headers.Authorization = `Bearer ${token}`
    }
    return next
  })

  client.interceptors.response.use(
    (res) => {
      finishRequestFeedback(res.config)
      toastApiSuccess(res.config)
      return res.data
    },
    async (err) => {
      if (isRequestCanceled(err)) {
        finishRequestFeedback(err.config)
        return Promise.reject(err)
      }
      const original = err.config || {}
      const status = err.response?.status
      const canRetry = status === 401 && original && !original._retry && !skipRefresh(original.url || '')
      if (canRetry) {
        original._retry = true
        try {
          const data = await refreshAccessToken()
          original.headers = original.headers || {}
          original.headers.Authorization = `Bearer ${data.accessToken}`
          return client.request(original)
        } catch {
          finishRequestFeedback(original)
          clear()
          toastApiError({ message: SESSION_EXPIRED }, original)
          return Promise.reject({ success: false, message: SESSION_EXPIRED })
        }
      }

      finishRequestFeedback(original)
      toastApiError(err, original)
      const data = err.response?.data
      if (data && typeof data === 'object') return Promise.reject(data)
      return Promise.reject({ success: false, message: apiErrorMessage(err) })
    }
  )

  return client
}

export const persistKeys = (accessKey, refreshKey) => ({ accessToken, refreshToken }) => {
  if (accessToken) localStorage.setItem(accessKey, accessToken)
  if (refreshToken) localStorage.setItem(refreshKey, refreshToken)
}

export const clearKeys = (accessKey, refreshKey) => () => {
  localStorage.removeItem(accessKey)
  localStorage.removeItem(refreshKey)
}
