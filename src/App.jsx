import { Route, Routes } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import RequireAuth from './components/auth/RequireAuth'
import { useAuth } from './context/AuthContext'
import { useAdminAuth } from './context/AdminAuthContext'
import DashboardLayout from './features/dashboard/DashboardLayout'
import OverviewPage from './features/dashboard/pages/OverviewPage'
import ProfilePage from './features/dashboard/pages/ProfilePage'
import MembershipPage from './features/dashboard/pages/MembershipPage'
import PaymentsPage from './features/dashboard/pages/PaymentsPage'
import DocumentsPage from './features/dashboard/pages/DocumentsPage'
import EventsPage from './features/dashboard/pages/EventsPage'
import EventDetailPage from './features/dashboard/pages/EventDetailPage'
import AdminLoginPage from './features/admin/pages/AdminLoginPage'
import AdminForgotPasswordPage from './features/admin/pages/AdminForgotPasswordPage'
import AdminResetPasswordPage from './features/admin/pages/AdminResetPasswordPage'
import AdminLayout from './features/admin/AdminLayout'
import AdminOverviewPage from './features/admin/pages/AdminOverviewPage'
import MembersPage from './features/admin/pages/MembersPage'
import MemberDetailPage from './features/admin/pages/MemberDetailPage'
import SunPharmaPage from './features/admin/pages/SunPharmaPage'
import ActiveMembersPage from './features/admin/pages/ActiveMembersPage'
import InactiveMembersPage from './features/admin/pages/InactiveMembersPage'
import ConferencesPage from './features/admin/pages/ConferencesPage'
import FinancePage from './features/admin/pages/FinancePage'
import CouponsPage from './features/admin/pages/CouponsPage'
import NotFoundRedirect from './components/auth/NotFoundRedirect'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/home"
        element={(
          <RequireAuth useAuth={useAuth} loginPath="/login" homePath="/home">
            <DashboardLayout />
          </RequireAuth>
        )}
      >
        <Route index element={<OverviewPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="membership" element={<MembershipPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
      </Route>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
      <Route path="/admin/reset-password" element={<AdminResetPasswordPage />} />
      <Route
        path="/admin/home"
        element={(
          <RequireAuth useAuth={useAdminAuth} loginPath="/admin/login" homePath="/admin/home">
            <AdminLayout />
          </RequireAuth>
        )}
      >
        <Route index element={<AdminOverviewPage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="members/:membershipId" element={<MemberDetailPage />} />
        <Route path="sun-pharma" element={<SunPharmaPage />} />
        <Route path="active" element={<ActiveMembersPage />} />
        <Route path="inactive" element={<InactiveMembersPage />} />
        <Route path="conferences" element={<ConferencesPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="coupons" element={<CouponsPage />} />
      </Route>
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  )
}

export default App
