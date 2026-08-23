const PageLayout = ({ children, className = '' }) => (
  <div className={`ds-portal-page ${className}`.trim()}>{children}</div>
)

export default PageLayout
