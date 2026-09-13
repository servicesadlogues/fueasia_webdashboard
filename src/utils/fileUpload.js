export const MAX_UPLOAD_FILE_SIZE = 5 * 1024 * 1024
export const MAX_UPLOAD_FILE_SIZE_LABEL = '5MB'

const ALLOWED_UPLOAD_PATTERN = /\.(pdf|jpe?g|png)$/i

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

export const validateUploadFiles = (files = []) => {
  for (const file of files) {
    const message = validateUploadFile(file)
    if (message) return message
  }
  return null
}
