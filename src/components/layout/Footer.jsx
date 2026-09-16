import { AdloguesCreditLink, copyrightNotice } from './BrandCredit'

const Footer = () => (
  <footer className="ds-app-footer">
    <p className="ds-app-footer-row">
      <span>{copyrightNotice()}</span>
      <AdloguesCreditLink />
    </p>
  </footer>
)

export default Footer
