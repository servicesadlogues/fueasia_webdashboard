import { Route, Routes } from 'react-router-dom'
import RequireAuth from '../components/auth/RequireAuth'
import { useAuth } from '../context/AuthContext'
import { useAdminAuth } from '../context/AdminAuthContext'
import NotFoundRedirect from '../components/auth/NotFoundRedirect'
import RouteErrorBoundary from './RouteErrorBoundary'
import LoginPage from '../pages/LoginPage'
import AdminLoginPage from '../features/admin/pages/AdminLoginPage'
import lazyPage from './lazyPage'

const RegistrationPage = lazyPage(() => import('../pages/RegistrationPage'))
const SpeakerSubmissionPage = lazyPage(() => import('../pages/SpeakerSubmissionPage'))
const DashboardLayout = lazyPage(() => import('../features/dashboard/DashboardLayout'))
const OverviewPage = lazyPage(() => import('../features/dashboard/pages/OverviewPage'))
const ProfilePage = lazyPage(() => import('../features/dashboard/pages/ProfilePage'))
const MembershipPage = lazyPage(() => import('../features/dashboard/pages/MembershipPage'))
const PaymentsPage = lazyPage(() => import('../features/dashboard/pages/PaymentsPage'))
const DocumentsPage = lazyPage(() => import('../features/dashboard/pages/DocumentsPage'))
const EventsPage = lazyPage(() => import('../features/dashboard/pages/EventsPage'))
const EventDetailPage = lazyPage(() => import('../features/dashboard/pages/EventDetailPage'))
const AdminForgotPasswordPage = lazyPage(() => import('../features/admin/pages/AdminForgotPasswordPage'))
const AdminResetPasswordPage = lazyPage(() => import('../features/admin/pages/AdminResetPasswordPage'))
const AdminLayout = lazyPage(() => import('../features/admin/AdminLayout'))
const AdminOverviewPage = lazyPage(() => import('../features/admin/pages/AdminOverviewPage'))
const MembersPage = lazyPage(() => import('../features/admin/pages/MembersPage'))
const MemberDetailPage = lazyPage(() => import('../features/admin/pages/MemberDetailPage'))
const SunPharmaPage = lazyPage(() => import('../features/admin/pages/SunPharmaPage'))
const ActiveMembersPage = lazyPage(() => import('../features/admin/pages/ActiveMembersPage'))
const InactiveMembersPage = lazyPage(() => import('../features/admin/pages/InactiveMembersPage'))
const ConferencesPage = lazyPage(() => import('../features/admin/pages/ConferencesPage'))
const FinancePage = lazyPage(() => import('../features/admin/pages/FinancePage'))
const CouponsPage = lazyPage(() => import('../features/admin/pages/CouponsPage'))
const SpeakerListPage = lazyPage(() => import('../features/admin/pages/SpeakerListPage'))
const SpeakerDetailPage = lazyPage(() => import('../features/admin/pages/SpeakerDetailPage'))

const AppRoutes = () => (
  <RouteErrorBoundary>
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/speakers" element={<SpeakerSubmissionPage />} />
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
        <Route path="speakers" element={<SpeakerListPage />} />
        <Route path="speakers/:id" element={<SpeakerDetailPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="coupons" element={<CouponsPage />} />
      </Route>
      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  </RouteErrorBoundary>
)

export default AppRoutes
