const DocumentPreviewModal = ({ open, title, url, mimeType, size = 'default', onClose }) => {
  if (!open || !url) return null

  const isPdf = mimeType === 'application/pdf' || /\.pdf$/i.test(title || '')
  const isLarge = size === 'large'

  return (
    <div className="ds-doc-preview-overlay" onClick={onClose}>
      <div
        className={`ds-doc-preview-modal${isLarge ? ' ds-doc-preview-modal--large' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ds-doc-preview-modal-header">
          <p className="ds-doc-preview-modal-title">{title || 'Preview'}</p>
          <button type="button" className="btn-ghost !py-1.5 !px-3" onClick={onClose}>
            Close
          </button>
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
    </div>
  )
}

export default DocumentPreviewModal
