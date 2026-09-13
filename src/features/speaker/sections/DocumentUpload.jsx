import { useState, useRef } from 'react'
import { notify } from '../../../utils/notify'
import {
  MAX_UPLOAD_FILE_SIZE_LABEL,
  validateUploadFile,
  validateUploadFiles,
} from '../../../utils/fileUpload'
import { uploadSpeakerDocuments } from '../../../services/api'
import { useFormContext } from '../FormContext'

const DOC_FIELDS = [
  { key: 'passport', label: 'Passport (for non-UAE residents)' },
  { key: 'emiratesId', label: 'Emirates ID (for UAE residents)' },
  { key: 'photo', label: 'Recent Photograph (professional high-resolution headshot)' },
  { key: 'cv', label: 'CV (for DHA CME approval)' },
]

const DocumentUpload = () => {
  const { sessionToken, setDocumentsUploaded, documentsUploaded } = useFormContext()
  const [files, setFiles] = useState({ passport: null, emiratesId: null, photo: null, cv: null })
  const [uploading, setUploading] = useState(false)
  const refs = { passport: useRef(), emiratesId: useRef(), photo: useRef(), cv: useRef() }

  const handleFileChange = (key) => (e) => {
    const file = e.target.files[0] || null
    if (file) {
      const error = validateUploadFile(file)
      if (error) {
        notify.error(error)
        e.target.value = ''
        return
      }
    }
    setFiles((prev) => ({ ...prev, [key]: file }))
    setDocumentsUploaded(false)
  }

  const selectedFiles = DOC_FIELDS.map(({ key }) => files[key]).filter(Boolean)
  const hasAnyFile = selectedFiles.length > 0

  const handleUpload = async () => {
    if (!hasAnyFile) {
      notify.info('No documents selected.')
      return
    }

    const validationError = validateUploadFiles(selectedFiles)
    if (validationError) {
      notify.error(validationError)
      return
    }

    const formData = new FormData()
    DOC_FIELDS.forEach(({ key }) => {
      if (files[key]) formData.append(key, files[key])
    })

    setUploading(true)
    try {
      await uploadSpeakerDocuments(formData, sessionToken)
      setDocumentsUploaded(true)
      notify.success('Documents uploaded successfully!')
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="section-card">
      <div className="section-header">2. Documents</div>
      <div className="section-body">
        {DOC_FIELDS.map(({ key, label }) => (
          <div key={key} className="mb-4">
            <label className="label">{label}</label>
            <div className="flex items-stretch border border-gray-200 rounded overflow-hidden">
              <button
                type="button"
                onClick={() => refs[key].current.click()}
                className="bg-white border-r border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Choose File
              </button>
              <span className="flex-1 px-3 py-2.5 text-sm text-gray-500 bg-gray-50 flex items-center truncate">
                {files[key] ? files[key].name : 'No File Chosen'}
              </span>
              <input
                ref={refs[key]}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange(key)}
                className="hidden"
              />
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 mt-2">
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="btn-primary"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {documentsUploaded && (
            <span className="text-green-600 text-sm font-medium">&#10003; Documents uploaded</span>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Accepted formats: PDF, JPG, PNG. Max {MAX_UPLOAD_FILE_SIZE_LABEL} per file.
        </p>
      </div>
    </div>
  )
}

export default DocumentUpload
