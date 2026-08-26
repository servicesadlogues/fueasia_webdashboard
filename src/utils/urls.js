const INTERNAL_PATH_RE = /^\/(?!\/)(?!.*:)[\w\-./]*$/

export const isInternalPath = (url) => INTERNAL_PATH_RE.test(String(url || '').trim())

export const sanitizeRedirectPath = (path, fallback) => {
  const raw = String(path || '').trim()
  return isInternalPath(raw) ? raw : fallback
}
