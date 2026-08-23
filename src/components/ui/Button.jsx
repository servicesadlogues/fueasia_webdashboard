const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'btn-outline',
  danger: 'btn-danger',
  'danger-solid': 'btn-danger-solid',
}

const Button = ({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...props
}) => (
  <button
    type={type}
    className={`${variants[variant] || variants.primary} gap-2 ${className}`.trim()}
    {...props}
  >
    {children}
  </button>
)

export default Button
