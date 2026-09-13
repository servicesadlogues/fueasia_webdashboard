import { Link } from 'react-router-dom'
import { BRAND_LOGO_URL } from '../../constants/brand'

const Header = ({ subtitle = 'Membership Registration Portal' }) => (
  <header className="ds-app-header">
    <div className="ds-app-header-inner">
      <div className="flex min-w-0 items-center gap-3">
        <img src={BRAND_LOGO_URL} alt="FUE Global" className="ds-app-logo" />
        <div>
          <h1 className="ds-title">FUE GLOBAL</h1>
          <p className="ds-subtitle">{subtitle}</p>
        </div>
      </div>
      <Link to="/login" className="ds-header-login">
        Already a member? <span>Log in</span>
      </Link>
    </div>
  </header>
)

export default Header
