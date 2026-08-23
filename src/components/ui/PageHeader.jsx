const PageHeader = ({ title, subtitle, kicker, actions, className = '', children }) => (
  <header className={`ds-page-head ${className}`.trim()}>
    <div className="min-w-0 flex-1">
      {kicker}
      {title ? <h1 className={`ds-display${kicker ? ' mt-2' : ''}`}>{title}</h1> : null}
      {subtitle ? <p className="ds-muted mt-1.5 max-w-2xl leading-relaxed">{subtitle}</p> : null}
      {children}
    </div>
    {actions ? <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div> : null}
  </header>
)

export default PageHeader
