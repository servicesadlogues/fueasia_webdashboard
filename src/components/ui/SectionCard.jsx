const SectionCard = ({
  title,
  actions,
  children,
  className = '',
  bodyClassName = '',
}) => (
  <section className={`section-card ${className}`.trim()}>
    {title ? (
      <div className="section-header flex items-center justify-between gap-3">
        <span>{title}</span>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    ) : null}
    <div className={`section-body ${bodyClassName}`.trim()}>{children}</div>
  </section>
)

export default SectionCard
