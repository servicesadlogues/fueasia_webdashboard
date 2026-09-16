import { Link } from 'react-router-dom'

const StatCard = ({ label, value, hint, to, icon: Icon }) => {
  const inner = (
    <div className={`ds-stat${to ? ' h-full' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <p className="ds-stat-label">{label}</p>
        {Icon ? (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[rgba(240,120,0,0.12)] text-[var(--color-primary)]">
            <Icon size={16} strokeWidth={2} aria-hidden />
          </span>
        ) : null}
      </div>
      <div className="ds-stat-value">{value}</div>
      {hint ? <p className="ds-stat-hint">{hint}</p> : null}
    </div>
  )
  return to ? (
    <Link to={to} className="block no-underline rounded-[var(--radius-xl)]" aria-label={label}>
      {inner}
    </Link>
  ) : inner
}

export default StatCard
