import { useEffect, useRef, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { notify } from '../../../utils/notify'
import {
  MAX_UPLOAD_FILE_SIZE_LABEL,
  validateImageUploadFile,
  validateUploadFile,
} from '../../../utils/fileUpload'
import { uploadSpeakerDocuments } from '../../../services/api'
import { useSpeakerForm } from '../FormContext'
import { DocumentPreviewBox, DocumentPreviewModal } from '../../../components/ui'
import { REQUIRED_SPEAKER_DOCS, SPEAKER_DOC_FIELDS } from '../constants'

const DocumentUpload = ({ docError }) => {
  const { sessionToken, uploadedDocs, markDocsUploaded, clearDocUploaded } = useSpeakerForm()
  const [files, setFiles] = useState(() =>
    REQUIRED_SPEAKER_DOCS.reduce((acc, key) => ({ ...acc, [key]: null }), {}),
  )
  const [previewUrls, setPreviewUrls] = useState(() =>
    REQUIRED_SPEAKER_DOCS.reduce((acc, key) => ({ ...acc, [key]: '' }), {}),
  )
  const [preview, setPreview] = useState({ open: false, title: '', url: '', mimeType: '' })
  const [uploadingKey, setUploadingKey] = useState('')
  const fileInputRefs = useRef({})

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

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0] || null
    if (file) {
      const error = field.imageOnly ? validateImageUploadFile(file) : validateUploadFile(file)
      if (error) {
        notify.error(error)
        e.target.value = ''
        return
      }
    }
    setFiles((prev) => ({ ...prev, [field.key]: file }))
    setPreviewUrl(field.key, file)
    clearDocUploaded(field.key)
  }

  const openPreview = (field) => {
    const file = files[field.key]
    if (!file) {
      notify.info('Choose a file first to preview it.')
      return
    }
    setPreview({
      open: true,
      title: field.label,
      url: previewUrls[field.key],
      mimeType: file.type,
    })
  }

  const handleDelete = (field) => {
    setFiles((prev) => ({ ...prev, [field.key]: null }))
    setPreviewUrl(field.key, null)
    clearDocUploaded(field.key)
    if (fileInputRefs.current[field.key]) fileInputRefs.current[field.key].value = ''
  }

  const handleUpload = async (field) => {
    const file = files[field.key]
    if (!file) {
      notify.info(`Select ${field.label.toLowerCase()} before uploading.`)
      return
    }

    const validationError = field.imageOnly
      ? validateImageUploadFile(file)
      : validateUploadFile(file)
    if (validationError) {
      notify.error(validationError)
      return
    }

    const formData = new FormData()
    formData.append(field.key, file)

    setUploadingKey(field.key)
    try {
      const res = await uploadSpeakerDocuments(formData, sessionToken)
      markDocsUploaded(res?.paths || {})
      notify.success(`${field.uploadLabel.replace('Upload ', '')} uploaded successfully!`)
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setUploadingKey('')
    }
  }

  const allUploaded = REQUIRED_SPEAKER_DOCS.every((key) => uploadedDocs[key])

  return (
    <>
      <div className="section-card">
        <div className="section-header">2. Documents</div>
        <div className="section-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-8">
            {SPEAKER_DOC_FIELDS.map((field) => {
              const file = files[field.key]
              const isUploading = uploadingKey === field.key

              return (
                <div key={field.key}>
                  <label className="label">
                    {field.label} <span className="required">*</span>
                  </label>

                  <div className="ds-file-picker-row">
                    <button type="button" onClick={() => fileInputRefs.current[field.key]?.click()}>
                      Choose File
                    </button>
                    <span>{file ? file.name : 'No File Chosen'}</span>
                    <input
                      ref={(el) => { fileInputRefs.current[field.key] = el }}
                      type="file"
                      accept={field.accept}
                      onChange={handleFileChange(field)}
                      className="hidden"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleUpload(field)}
                    disabled={isUploading || !file}
                    className="btn-primary mt-3 w-full sm:w-auto"
                  >
                    {isUploading ? 'Uploading...' : field.uploadLabel}
                  </button>

                  <div className="mt-4">
                    <div className="ds-doc-preview-row">
                      <DocumentPreviewBox
                        file={file}
                        previewUrl={previewUrls[field.key]}
                        portrait={field.portrait}
                      />

                      <div className="ds-doc-preview-actions">
                        <button
                          type="button"
                          onClick={() => openPreview(field)}
                          disabled={!file}
                          className="btn-outline disabled:opacity-40 whitespace-nowrap"
                        >
                          View Full
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(field)}
                          disabled={!file && !uploadedDocs[field.key]}
                          className="ds-icon-btn-danger"
                          title={`Delete ${field.label}`}
                          aria-label={`Delete ${field.label}`}
                        >
                          <Trash2 className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    {uploadedDocs[field.key] && (
                      <p className="badge-success text-xs mt-3">&#10003; Uploaded</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {allUploaded && (
            <p className="badge-success text-sm mt-6">&#10003; All required documents uploaded</p>
          )}

          {docError && <p className="error-text mt-3">{docError}</p>}

          <p className="ds-caption mt-4">
            Accepted formats: photograph JPG/PNG; passport and CV PDF, JPG, PNG. Max {MAX_UPLOAD_FILE_SIZE_LABEL} per file.
          </p>
        </div>
      </div>

      <DocumentPreviewModal
        open={preview.open}
        title={preview.title}
        url={preview.url}
        mimeType={preview.mimeType}
        size="large"
        onClose={() => setPreview({ open: false, title: '', url: '', mimeType: '' })}
      />
    </>
  )
}

export default DocumentUpload
