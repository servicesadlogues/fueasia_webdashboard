import { useEffect, useId, useRef } from 'react'

const DangerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
    <path d="M3 6h18" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
    <path d="M14 7V5.5A1.5 1.5 0 0 0 12.5 4h-7A1.5 1.5 0 0 0 4 5.5v13A1.5 1.5 0 0 0 5.5 20h7A1.5 1.5 0 0 0 14 18.5V17" />
    <path d="M10 12h10M16.5 8.5 20 12l-3.5 3.5" />
  </svg>
)

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
          {isDanger ? <DangerIcon /> : <LogoutIcon />}
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
