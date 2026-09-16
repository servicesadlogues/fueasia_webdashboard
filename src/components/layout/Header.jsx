import { Link } from 'react-router-dom'
import { BRAND_LOGO_URL } from '../../constants/brand'

const Header = ({ subtitle = 'Membership Registration Portal', showSpeakerLink = false }) => (
  <header className="ds-app-header">
    <a href="#main-content" className="ds-skip-link">Skip to content</a>
    <div className="ds-app-header-inner">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <img src={BRAND_LOGO_URL} alt="FUE Global" className="ds-app-logo shrink-0" />
        <div className="min-w-0">
          <h1 className="ds-title">FUE GLOBAL</h1>
          <p className={`ds-subtitle truncate ${showSpeakerLink ? 'hidden min-[420px]:block' : ''}`}>
            {subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-4 flex-nowrap shrink-0">
        {showSpeakerLink && (
          <Link to="/speakers" className="ds-header-speaker-link">
            Register as speaker
          </Link>
        )}
        <Link to="/login" className="ds-header-login whitespace-nowrap">
          <span className="hidden sm:inline">Already a member?</span>
          <span>Log in</span>
        </Link>
      </div>
    </div>
  </header>
)

export default Header
