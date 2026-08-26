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
const SESSION_EXPIRED_EVENT = 'fue-session-expired'

export const onSessionExpiredEvent = (handler) => {
  const listener = (event) => handler(event.detail)
  window.addEventListener(SESSION_EXPIRED_EVENT, listener)
  return () => window.removeEventListener(SESSION_EXPIRED_EVENT, listener)
}

const emitSessionExpired = (scope) => {
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT, { detail: scope }))
}

export const createHttpClient = ({ refreshPath, skipRefresh, sessionScope }) => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    withCredentials: true,
  })

  let refreshInFlight = null

  const refreshAccessToken = () => {
    if (!refreshInFlight) {
      refreshInFlight = axios
        .post(`${API_BASE_URL}${refreshPath}`, {}, { withCredentials: true, timeout: 30000 })
        .then((res) => res.data)
        .finally(() => {
          refreshInFlight = null
        })
    }
    return refreshInFlight
  }

  client.interceptors.request.use((config) => startRequestFeedback(config))

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
          await refreshAccessToken()
          return client.request(original)
        } catch {
          finishRequestFeedback(original)
          if (sessionScope) emitSessionExpired(sessionScope)
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
