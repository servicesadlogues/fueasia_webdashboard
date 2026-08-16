let pending = 0
const listeners = new Set()

const emit = () => {
  listeners.forEach((listener) => listener(pending > 0))
}

export const beginLoader = () => {
  pending += 1
  emit()
}

export const endLoader = () => {
  pending = Math.max(0, pending - 1)
  emit()
}

export const isLoaderVisible = () => pending > 0

export const subscribeLoader = (listener) => {
  listeners.add(listener)
  listener(pending > 0)
  return () => listeners.delete(listener)
}
