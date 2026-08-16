const PageHeader = ({ title, subtitle, kicker, actions, className = '', children }) => (
  <div className={`ds-page-head ${className}`.trim()}>
    <div>
      {kicker}
      {title ? <h2 className={`ds-display${kicker ? ' mt-2' : ''}`}>{title}</h2> : null}
      {subtitle ? <p className="ds-muted mt-1">{subtitle}</p> : null}
      {children}
    </div>
    {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
  </div>
)

export default PageHeader
