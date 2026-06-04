import { useState, useRef } from 'react'
import { toast } from 'react-toastify'
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
    setFiles((prev) => ({ ...prev, [key]: e.target.files[0] || null }))
    setDocumentsUploaded(false)
  }

  const hasAnyFile = files.medicalCertificate || files.profilePic || files.pgDegree

  const handleUpload = async () => {
    if (!hasAnyFile) {
      toast.info('No documents selected. You may proceed without uploading.')
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
      toast.success('Documents uploaded successfully!')
    } catch (err) {
      toast.error(err.message || 'Upload failed. Please try again.')
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

        <p className="text-xs text-gray-400 mt-3">Accepted formats: PDF, JPG, PNG. Max 5MB per file.</p>
      </div>
    </div>
  )
}

export default DocumentUpload
