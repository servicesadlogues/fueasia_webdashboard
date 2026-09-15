import { useState, useRef } from 'react'
import { notify } from '../../../utils/notify'
import { uploadDocuments } from '../../../services/api'
import { useFormContext } from '../FormContext'

const DOC_FIELDS = [
  { key: 'medicalCertificate', label: 'Medical Council Registration Certificate' },
  { key: 'profilePic', label: 'Profile Pic' },
  { key: 'pgDegree', label: 'Post Graduation Degree / Certificate' },
]

const DocumentUpload = () => {
  const { sessionToken, setDocumentsUploaded, documentsUploaded } = useFormContext()
  const [files, setFiles] = useState({ medicalCertificate: null, profilePic: null, pgDegree: null })
  const [uploading, setUploading] = useState(false)
  const refs = { medicalCertificate: useRef(), profilePic: useRef(), pgDegree: useRef() }

  const handleFileChange = (key) => (e) => {
    const file = e.target.files[0] || null
    if (file && file.size > 5 * 1024 * 1024) {
      notify.error('File too large. Max 5MB per file.')
      e.target.value = ''
      return
    }
    if (file && !/\.(pdf|jpe?g|png)$/i.test(file.name)) {
      notify.error('Only PDF, JPG, and PNG files are allowed.')
      e.target.value = ''
      return
    }
    setFiles((prev) => ({ ...prev, [key]: file }))
    setDocumentsUploaded(false)
  }

  const hasAnyFile = files.medicalCertificate || files.profilePic || files.pgDegree

  const handleUpload = async () => {
    if (!hasAnyFile) {
      notify.info('No documents selected. You may proceed without uploading.')
      return
    }

    const formData = new FormData()
    if (files.medicalCertificate) formData.append('medicalCertificate', files.medicalCertificate)
    if (files.profilePic)         formData.append('profilePic', files.profilePic)
    if (files.pgDegree)           formData.append('pgDegree', files.pgDegree)

    setUploading(true)
    try {
      await uploadDocuments(formData, sessionToken)
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
      <div className="section-header">Document&apos;s Upload <span className="text-sm font-normal opacity-80">(Optional)</span></div>
      <div className="section-body">

        {DOC_FIELDS.map(({ key, label }) => (
          <div key={key} className="mb-4">
            <label className="label">{label}</label>
            <div className="ds-file-picker-row">
              <button
                type="button"
                onClick={() => refs[key].current.click()}
              >
                Choose File
              </button>
              <span>
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

        <div className="flex flex-wrap items-center gap-4 mt-2">
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="btn-primary w-full sm:w-auto"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {documentsUploaded && (
            <span className="text-green-600 text-sm font-medium">&#10003; Documents uploaded</span>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-3">Accepted formats: PDF, JPG, PNG. Max 5MB per file.</p>
      </div>
    </div>
  )
}

export default DocumentUpload
