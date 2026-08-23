import { useState } from 'react'
import { notify } from '../../../utils/notify'
import PageHeader from '../../../components/ui/PageHeader'
import ConfirmDialog from '../../../components/ui/ConfirmDialog'
import { useDashboard } from '../dashboardContext'

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const FileIcon = ({ fileName }) => {
  const isPdf = /\.pdf$/i.test(fileName || '')
  const isImage = /\.(jpe?g|png)$/i.test(fileName || '')
  if (isPdf) {
    return (
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
    )
  }
  if (isImage) {
    return (
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    )
  }
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    </div>
  )
}

const actionBtnClass = 'inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--color-border)] text-gray-500 hover:border-primary hover:bg-primary/5 transition-colors flex-shrink-0'

const DocumentsPage = () => {
  const { documents, deleteDocument } = useDashboard()
  const items = documents.items || []
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      await deleteDocument(pendingDelete.key)
      notify.success(`${pendingDelete.label} deleted.`)
      setPendingDelete(null)
    } catch (err) {
      notify.error(err.message || 'Could not delete this document.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="Files uploaded with your registration. Links expire after one hour — refresh the page if a link fails."
      />

      <div className="section-card">
        <div className="section-header">Submitted files</div>
        {items.length === 0 ? (
          <div className="ds-empty">
            <p>No documents are on file.</p>
            <p className="ds-caption mt-2">
              Photograph, medical certificate, and PG degree were optional at registration.
            </p>
          </div>
        ) : (
          <div className="section-body flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.key} className="ds-file-row">
                <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileIcon fileName={item.fileName} />
                    <div className="min-w-0">
                      <p className="ds-label">{item.label}</p>
                      <p className="ds-caption truncate max-w-xs" title={item.fileName}>{item.fileName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      title="Preview file"
                      className={`${actionBtnClass} hover:text-primary`}
                    >
                      <EyeIcon />
                      <span className="sr-only">Preview</span>
                    </a>
                    <button
                      type="button"
                      title="Delete file"
                      className={`${actionBtnClass} hover:text-red-600 hover:border-red-300 hover:bg-red-50`}
                      onClick={() => setPendingDelete(item)}
                    >
                      <TrashIcon />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this document?"
        message="This action cannot be undone. The file will be removed from your account."
        detail={pendingDelete ? {
          title: pendingDelete.label,
          subtitle: pendingDelete.fileName,
        } : null}
        confirmLabel="Yes, delete"
        cancelLabel="Keep file"
        busy={deleting}
        onCancel={() => !deleting && setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default DocumentsPage
