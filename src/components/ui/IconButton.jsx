const IconButton = ({
  label,
  className = '',
  children,
  ...props
}) => (
  <button
    type="button"
    className={`ds-icon-btn ${className}`.trim()}
    aria-label={label}
    title={label}
    {...props}
  >
    {children}
  </button>
)

export default IconButton
