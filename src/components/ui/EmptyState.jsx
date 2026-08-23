import { Inbox } from 'lucide-react'

const EmptyState = ({
  title = 'Nothing here yet',
  message,
  action,
  className = '',
}) => (
  <div className={`ds-empty ${className}`.trim()}>
    <Inbox className="mx-auto mb-3 h-10 w-10 text-[var(--color-muted)] opacity-60" strokeWidth={1.5} aria-hidden />
    <p className="font-semibold text-[var(--color-navy)]">{title}</p>
    {message ? <p className="ds-muted mt-2 max-w-sm mx-auto">{message}</p> : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
)

export default EmptyState
