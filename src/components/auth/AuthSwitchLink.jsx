import { Link } from 'react-router-dom'

const AuthSwitchLink = ({ prompt, to, label }) => (
  <p className="ds-muted text-center mt-4">
    {prompt}{' '}
    <Link to={to} className="ds-link">{label}</Link>
  </p>
)

export default AuthSwitchLink
