import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'
import GlobalLoader from './components/feedback/GlobalLoader.jsx'
import AppToaster from './components/feedback/AppToaster.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <App />
          <GlobalLoader />
          <AppToaster />
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
