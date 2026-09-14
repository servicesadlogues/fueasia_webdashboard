import { useEffect, useRef, useState } from 'react'
import { notify } from '../../../utils/notify'
import {
  MAX_UPLOAD_FILE_SIZE_LABEL,
  validateUploadFile,
  validateUploadFiles,
} from '../../../utils/fileUpload'
import { uploadSpeakerDocuments } from '../../../services/api'
import { useFormContext } from '../FormContext'
import { DocumentPreviewModal } from '../../../components/ui'
import { REQUIRED_SPEAKER_DOCS } from '../constants'

const DOC_FIELDS = [
  { key: 'passport', label: 'Passport' },
  { key: 'cv', label: 'CV' },
]

const DocumentUpload = ({ docError }) => {
  const { sessionToken, uploadedDocs, markDocsUploaded, clearDocUploaded } = useFormContext()
  const [files, setFiles] = useState(() =>
    REQUIRED_SPEAKER_DOCS.reduce((acc, key) => ({ ...acc, [key]: null }), {}),
  )
  const [previewUrls, setPreviewUrls] = useState(() =>
    REQUIRED_SPEAKER_DOCS.reduce((acc, key) => ({ ...acc, [key]: '' }), {}),
  )
  const [preview, setPreview] = useState({ open: false, title: '', url: '', mimeType: '' })
  const [uploading, setUploading] = useState(false)
  const refs = REQUIRED_SPEAKER_DOCS.reduce((acc, key) => {
    acc[key] = useRef()
    return acc
  }, {})

  const previewUrlsRef = useRef(previewUrls)
  previewUrlsRef.current = previewUrls

  useEffect(() => () => {
    Object.values(previewUrlsRef.current).forEach((url) => {
      if (url) URL.revokeObjectURL(url)
    })
  }, [])

  const setPreviewUrl = (key, file) => {
    setPreviewUrls((current) => {
      if (current[key]) URL.revokeObjectURL(current[key])
      return { ...current, [key]: file ? URL.createObjectURL(file) : '' }
    })
  }

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
    setPreviewUrl(key, file)
    clearDocUploaded(key)
  }

  const openPreview = (key, label) => {
    const file = files[key]
    if (!file) {
      notify.info('Choose a file first to preview it.')
      return
    }
    setPreview({
      open: true,
      title: label,
      url: previewUrls[key],
      mimeType: file.type,
    })
  }

  const selectedFiles = DOC_FIELDS.map(({ key }) => files[key]).filter(Boolean)
  const hasAnyFile = selectedFiles.length > 0
  const allSelected = REQUIRED_SPEAKER_DOCS.every((key) => files[key])
  const allUploaded = REQUIRED_SPEAKER_DOCS.every((key) => uploadedDocs[key])

  const handleUpload = async () => {
    if (!hasAnyFile) {
      notify.info('Select passport and CV before uploading.')
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
      const res = await uploadSpeakerDocuments(formData, sessionToken)
      markDocsUploaded(res?.paths || {})
      notify.success('Documents uploaded successfully!')
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <div className="section-card">
        <div className="section-header">2. Documents</div>
        <div className="section-body">
          {DOC_FIELDS.map(({ key, label }) => (
            <div key={key} className="mb-4">
              <label className="label">
                {label} <span className="text-red-500">*</span>
              </label>
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
                <button
                  type="button"
                  onClick={() => openPreview(key, label)}
                  disabled={!files[key]}
                  className="bg-white border-l border-gray-200 px-4 py-2.5 text-sm font-medium text-navy hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-40"
                >
                  Preview
                </button>
                <input
                  ref={refs[key]}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange(key)}
                  className="hidden"
                />
              </div>
              {uploadedDocs[key] && (
                <p className="text-green-600 text-xs font-medium mt-1">&#10003; {label} uploaded</p>
              )}
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading || !allSelected}
              className="btn-primary"
            >
              {uploading ? 'Uploading...' : 'Upload Documents'}
            </button>
            {allUploaded && (
              <span className="text-green-600 text-sm font-medium">&#10003; All required documents uploaded</span>
            )}
          </div>

          {docError && <p className="error-text mt-3">{docError}</p>}

          <p className="text-xs text-gray-400 mt-3">
            Accepted formats: PDF, JPG, PNG. Max {MAX_UPLOAD_FILE_SIZE_LABEL} per file. Preview each file before submitting the form.
          </p>
        </div>
      </div>

      <DocumentPreviewModal
        open={preview.open}
        title={preview.title}
        url={preview.url}
        mimeType={preview.mimeType}
        onClose={() => setPreview({ open: false, title: '', url: '', mimeType: '' })}
      />
    </>
  )
}

export default DocumentUpload
