const DocumentPreviewModal = ({ open, title, url, mimeType, onClose }) => {
  if (!open || !url) return null

  const isPdf = mimeType === 'application/pdf' || /\.pdf$/i.test(title || '')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-200">
          <p className="font-semibold text-navy truncate">{title || 'Preview'}</p>
          <button type="button" className="btn-ghost !py-1.5 !px-3" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          {isPdf ? (
            <iframe title={title} src={url} className="w-full min-h-[70vh] rounded border border-gray-200 bg-white" />
          ) : (
            <img src={url} alt={title} className="max-w-full mx-auto rounded border border-gray-200 bg-white" />
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentPreviewModal
