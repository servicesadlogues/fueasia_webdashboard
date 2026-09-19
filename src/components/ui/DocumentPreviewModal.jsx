import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import IconButton from './IconButton'

const DocumentPreviewModal = ({ open, title, url, mimeType, size = 'default', onClose }) => {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open || !url) return null

  const isPdf = mimeType === 'application/pdf' || /\.pdf$/i.test(title || '')
  const isLarge = size === 'large'

  return createPortal(
    <div
      className={`ds-doc-preview-overlay${isPdf ? ' ds-doc-preview-overlay--pdf' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Document preview'}
    >
      <button
        type="button"
        className="ds-doc-preview-backdrop"
        aria-label="Close preview"
        onClick={onClose}
      />
      <div
        className={`ds-doc-preview-modal${isLarge ? ' ds-doc-preview-modal--large' : ''}${isPdf ? ' ds-doc-preview-modal--pdf' : ''}`}
      >
        <div className="ds-doc-preview-modal-header">
          <p className="ds-doc-preview-modal-title">{title || 'Preview'}</p>
          <IconButton label="Close preview" onClick={onClose}>
            <X size={18} strokeWidth={2} aria-hidden />
          </IconButton>
        </div>
        <div className="ds-doc-preview-modal-body">
          {isPdf ? (
            <iframe
              title={title}
              src={url}
              className={`ds-doc-preview-frame${isLarge ? ' ds-doc-preview-frame--large' : ''}`}
            />
          ) : (
            <img
              src={url}
              alt={title}
              className={`ds-doc-preview-image${isLarge ? ' ds-doc-preview-image--large' : ''}`}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default DocumentPreviewModal
