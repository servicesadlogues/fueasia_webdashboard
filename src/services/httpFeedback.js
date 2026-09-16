import { beginLoader, endLoader } from '../feedback/loaderStore'
import { notify } from '../utils/notify'

const SKIP_LOADER_URL = /\/captcha$|\/auth\/refresh|\/admin\/auth\/refresh|\/auth\/me$|\/admin\/auth\/me|\/auth\/logout|\/admin\/auth\/logout/
const SKIP_TOAST_URL = /\/auth\/refresh|\/admin\/auth\/refresh|\/auth\/me$|\/admin\/auth\/me|\/auth\/logout|\/admin\/auth\/logout/

export const apiErrorMessage = (err) => {
  if (!err) return 'Something went wrong. Please try again.'
  if (err.response?.data?.message) return err.response.data.message
  if (err.message && err.message !== 'Network Error' && err.message !== 'timeout of 30000ms exceeded') {
    return err.message
  }
  if (!err.response) return 'Network error. Please check your connection and try again.'
  return 'Something went wrong. Please try again.'
}

/** Use on axios config when the UI already shows its own full-page or inline upload loader. */
export const localLoader = { skipLoader: true }

const skipLoaderStart = (config) =>
  Boolean(config?.silent || config?.skipLoader || config?._retry || SKIP_LOADER_URL.test(config?.url || ''))

const skipLoaderEnd = (config) =>
  Boolean(config?.silent || config?.skipLoader || SKIP_LOADER_URL.test(config?.url || ''))

const skipErrorToast = (config) =>
  Boolean(config?.silent || config?.skipErrorToast || SKIP_TOAST_URL.test(config?.url || ''))

export const startRequestFeedback = (config) => {
  if (!skipLoaderStart(config)) beginLoader()
  return config
}

export const finishRequestFeedback = (config, { retrying = false } = {}) => {
  if (retrying || skipLoaderEnd(config)) return
  endLoader()
}

export const isRequestCanceled = (err) =>
  Boolean(err) && (err.code === 'ERR_CANCELED' || err.name === 'CanceledError' || err.name === 'AbortError')

export const toastApiError = (err, config) => {
  if (isRequestCanceled(err) || skipErrorToast(config)) return
  notify.error(apiErrorMessage(err))
}

export const toastApiSuccess = (config) => {
  if (config?.successMessage) notify.success(config.successMessage)
}
