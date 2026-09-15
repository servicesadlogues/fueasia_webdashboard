export const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024
export const MAX_UPLOAD_FILE_SIZE_LABEL = '5MB'

const ALLOWED_UPLOAD_PATTERN = /\.(pdf|jpe?g|png)$/i
const IMAGE_UPLOAD_PATTERN = /\.(jpe?g|png)$/i

export const isPdfFile = (file) =>
  file?.type === 'application/pdf' || /\.pdf$/i.test(file?.name || '')

export const resolvePreviewMimeType = (mimeType = '', fileName = '') => {
  if (mimeType) return mimeType
  if (/\.pdf$/i.test(fileName)) return 'application/pdf'
  if (/\.png$/i.test(fileName)) return 'image/png'
  if (/\.(jpe?g)$/i.test(fileName)) return 'image/jpeg'
  return ''
}

export const validateUploadFile = (file) => {
  if (!file) return null
  if (file.size > MAX_UPLOAD_FILE_SIZE) {
    return `File too large. Max ${MAX_UPLOAD_FILE_SIZE_LABEL} per file.`
  }
  if (!ALLOWED_UPLOAD_PATTERN.test(file.name)) {
    return 'Only PDF, JPG, and PNG files are allowed.'
  }
  return null
}

export const validateImageUploadFile = (file) => {
  if (!file) return null
  if (file.size > MAX_UPLOAD_FILE_SIZE) {
    return `File too large. Max ${MAX_UPLOAD_FILE_SIZE_LABEL} per file.`
  }
  if (!IMAGE_UPLOAD_PATTERN.test(file.name)) {
    return 'Only JPG and PNG images are allowed.'
  }
  return null
}

export const validateUploadFiles = (files = []) => {
  for (const file of files) {
    const message = validateUploadFile(file)
    if (message) return message
  }
  return null
}
