import { useEffect, useState } from 'react'
import PageLayout from '../ui/PageLayout'
import { AdloguesCreditLink, copyrightNotice } from './BrandCredit'

const AppShell = ({ sidebar, topbar, children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.overflow = previousOverflow
      document.body.style.overflow = previousBodyOverflow
    }
  }, [])

  return (
    <div className="ds-dash">
      {menuOpen ? (
        <button type="button" className="ds-overlay md:hidden" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      ) : null}
      {sidebar({ open: menuOpen, onNavigate: () => setMenuOpen(false) })}
      <div className="ds-dash-frame">
        <a href="#main-content" className="ds-skip-link">Skip to content</a>
        {topbar({ onMenu: () => setMenuOpen(true) })}
        <main id="main-content" className="ds-dash-main" tabIndex={-1}>
          <PageLayout>{children}</PageLayout>
        </main>
        <footer className="ds-dash-footer">
          <span>{copyrightNotice()}</span>
          <AdloguesCreditLink />
        </footer>
      </div>
    </div>
  )
}

export default AppShell
