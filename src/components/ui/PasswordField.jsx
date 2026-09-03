import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import IconButton from './IconButton'

const PasswordField = ({
  id,
  value,
  onChange,
  className = '',
  autoComplete,
  disabled = false,
  autoFocus = false,
  placeholder,
  ...props
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`ds-password-field ${className}`.trim()}>
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        className="input-field"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        {...props}
      />
      <IconButton
        label={visible ? 'Hide password' : 'Show password'}
        className="ds-password-field-toggle"
        onClick={() => setVisible((current) => !current)}
        disabled={disabled}
      >
        {visible ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
      </IconButton>
    </div>
  )
}

export default PasswordField
