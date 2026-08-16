import { BRAND_LOGO_URL } from '../../constants/brand'

const AuthSplitLayout = ({ title, subtitle, children }) => (
  <div className="login-shell">
    <div className="login-frame">
      <div className="login-panel-image" aria-hidden="true">
        <img src="/login-panel.png" alt="FUE Global medical professionals" />
      </div>
      <div className="login-panel-form">
        <img src={BRAND_LOGO_URL} alt="FUE Global" className="login-logo" />
        <h1 className="ds-display text-center mb-1">{title}</h1>
        {subtitle ? <p className="ds-muted text-center mb-6">{subtitle}</p> : <div className="mb-6" />}
        {children}
      </div>
    </div>
  </div>
)

export default AuthSplitLayout
