import { useEffect, useId, useRef } from 'react'
import { LogOut, Trash2 } from 'lucide-react'

const ConfirmDialog = ({
  open,
  title,
  message,
  detail,
  variant = 'danger',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  busy = false,
  busyLabel,
  onConfirm,
  onCancel,
}) => {
  const cancelRef = useRef(null)
  const titleId = useId()
  const messageId = useId()
  const isDanger = variant === 'danger'
  const iconClass = isDanger ? 'icon-circle-danger' : 'icon-circle-neutral'
  const confirmClass = isDanger ? 'btn-danger-solid' : 'btn-primary'
  const confirmText = busy ? (busyLabel || (isDanger ? 'Deleting...' : 'Logging out...')) : confirmLabel

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cancelRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !busy) onCancel()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, busy, onCancel])

  if (!open) return null

  return (
    <div className="ds-modal-root" role="presentation">
      <button
        type="button"
        className="ds-modal-backdrop"
        aria-label="Close dialog"
        onClick={busy ? undefined : onCancel}
        tabIndex={-1}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={message ? messageId : undefined}
        className="ds-modal-panel"
      >
        <div className={`icon-circle ${iconClass}`}>
          {isDanger
            ? <Trash2 className="h-7 w-7" aria-hidden />
            : <LogOut className="h-7 w-7" aria-hidden />}
        </div>

        <h3 id={titleId} className="ds-display text-center">{title}</h3>

        {message ? (
          <p id={messageId} className="ds-muted mt-3 text-center leading-relaxed">
            {message}
          </p>
        ) : null}

        {detail ? (
          <div className="ds-modal-detail">
            {detail.title ? <p className="ds-modal-detail-label">{detail.title}</p> : null}
            {detail.subtitle ? <p className="ds-modal-detail-value">{detail.subtitle}</p> : null}
          </div>
        ) : null}

        <div className="ds-modal-actions">
          <button
            ref={cancelRef}
            type="button"
            className="btn-ghost w-full"
            onClick={onCancel}
            disabled={busy}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`${confirmClass} w-full`}
            onClick={onConfirm}
            disabled={busy}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
