import { Link } from 'react-router-dom'
import { BRAND_LOGO_URL } from '../../constants/brand'

const Header = () => (
  <header className="ds-app-header">
    <div className="ds-app-header-inner">
      <div className="flex min-w-0 items-center gap-3">
        <img src={BRAND_LOGO_URL} alt="FUE Global" className="ds-app-logo" />
        <div>
          <h1 className="ds-title">FUE GLOBAL</h1>
          <p className="ds-subtitle">Membership Registration Portal</p>
        </div>
      </div>
      <Link to="/login" className="ds-link shrink-0">Already a member? Log in</Link>
    </div>
  </header>
)

export default Header
