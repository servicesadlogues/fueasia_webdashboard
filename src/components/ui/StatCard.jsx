import { Link } from 'react-router-dom'

const StatCard = ({ label, value, hint, to }) => {
  const inner = (
    <div className={`ds-stat${to ? ' h-full' : ''}`}>
      <p className="ds-stat-label">{label}</p>
      <div className="ds-stat-value">{value}</div>
      {hint ? <p className="ds-stat-hint">{hint}</p> : null}
    </div>
  )
  return to ? <Link to={to} className="block no-underline">{inner}</Link> : inner
}

export default StatCard
