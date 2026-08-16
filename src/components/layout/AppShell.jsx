import { useState } from 'react'

const AppShell = ({ sidebar, topbar, children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="ds-dash">
      {menuOpen ? (
        <button type="button" className="ds-overlay md:hidden" aria-label="Close menu" onClick={() => setMenuOpen(false)} />
      ) : null}
      {sidebar({ open: menuOpen, onNavigate: () => setMenuOpen(false) })}
      <div className="ds-dash-frame">
        {topbar({ onMenu: () => setMenuOpen(true) })}
        <main className="ds-dash-main">{children}</main>
        <footer className="ds-dash-footer">
          © {new Date().getFullYear()} FUE Global. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default AppShell
