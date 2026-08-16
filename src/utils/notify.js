import { toast } from 'react-toastify'

const show = (type, message) => {
  const text = String(message || '').trim()
  if (!text) return
  toast[type](text)
}

export const notify = {
  success: (message) => show('success', message),
  error: (message) => show('error', message),
  info: (message) => show('info', message),
  warning: (message) => show('warning', message),
}
