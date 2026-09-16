import { BRAND_LOGO_URL, LOGIN_PANEL_IMAGE_URL } from '../../constants/brand'

const AuthSplitLayout = ({ title, subtitle, children }) => (
  <div className="login-shell">
    <a href="#main-content" className="ds-skip-link">Skip to login</a>
    <main id="main-content" className="login-frame" tabIndex={-1}>
      <div className="login-panel-image" aria-hidden="true">
        <img src={LOGIN_PANEL_IMAGE_URL} alt="" />
      </div>
      <div className="login-panel-form">
        <img src={BRAND_LOGO_URL} alt="FUE Global" className="login-logo" />
        <h1 className="ds-display text-center mb-1">{title}</h1>
        {subtitle ? <p className="ds-muted text-center mb-6">{subtitle}</p> : <div className="mb-6" />}
        {children}
      </div>
    </main>
  </div>
)

export default AuthSplitLayout
