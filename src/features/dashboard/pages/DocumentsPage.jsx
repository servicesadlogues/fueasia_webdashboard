import { useState } from 'react'
import { Eye, FileText, Image, Trash2 } from 'lucide-react'
import { notify } from '../../../utils/notify'
import { ConfirmDialog, EmptyState, PageHeader } from '../../../components/ui'
import { useDashboard } from '../dashboardContext'

const FileIcon = ({ fileName }) => {
  const isPdf = /\.pdf$/i.test(fileName || '')
  const isImage = /\.(jpe?g|png)$/i.test(fileName || '')
  if (isPdf) {
    return (
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
        <FileText className="w-5 h-5 text-red-500" aria-hidden />
      </div>
    )
  }
  if (isImage) {
    return (
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
        <Image className="w-5 h-5 text-blue-500" aria-hidden />
      </div>
    )
  }
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
      <FileText className="w-5 h-5 text-gray-400" aria-hidden />
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
          <EmptyState
            title="No documents are on file"
            message="Photograph, medical certificate, and PG degree were optional at registration."
          />
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
                      <Eye className="w-4 h-4" aria-hidden />
                      <span className="sr-only">Preview</span>
                    </a>
                    <button
                      type="button"
                      title="Delete file"
                      className={`${actionBtnClass} hover:text-red-600 hover:border-red-300 hover:bg-red-50`}
                      onClick={() => setPendingDelete(item)}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden />
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
