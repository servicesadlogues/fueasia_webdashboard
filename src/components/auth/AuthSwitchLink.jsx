import { Link } from 'react-router-dom'

const AuthSwitchLink = ({ prompt, to, label }) => (
  <div className="ds-muted text-center mt-4">
    <p className="m-0">{prompt}</p>
    <Link to={to} className="ds-link mt-1 inline-block">{label}</Link>
  </div>
)

export default AuthSwitchLink
