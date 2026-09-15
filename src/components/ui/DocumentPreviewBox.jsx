import { FileText } from 'lucide-react'
import { isPdfFile } from '../../utils/fileUpload'

const DocumentPreviewBox = ({ file, previewUrl, portrait = false }) => {
  if (!file) {
    return (
      <div className="ds-doc-preview-box ds-doc-preview-box--empty">
        <p>No file uploaded</p>
      </div>
    )
  }

  if (isPdfFile(file)) {
    return (
      <div className="ds-doc-preview-box ds-doc-preview-box--pdf">
        <FileText className="ds-doc-preview-pdf-icon" aria-hidden="true" />
        <p className="ds-doc-preview-filename">{file.name}</p>
      </div>
    )
  }

  return (
    <div
      className={`ds-doc-preview-box ds-doc-preview-box--image${
        portrait ? ' ds-doc-preview-box--portrait' : ''
      }`}
    >
      <img src={previewUrl} alt={file.name} />
    </div>
  )
}

export default DocumentPreviewBox
