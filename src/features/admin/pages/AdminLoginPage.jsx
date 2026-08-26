import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import AuthSplitLayout from '../../../components/auth/AuthSplitLayout'
import AuthBusy from '../../../components/auth/AuthBusy'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { loginAdmin } from '../../../services/adminHttp'
import { validateAdminEmail, validateAdminPassword } from '../../../utils/adminAuthValidation'

const AdminLoginPage = () => {
  const { isAuthenticated, loading, login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/admin/home'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) return <AuthBusy />

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const emailError = validateAdminEmail(email)
    const passwordError = validateAdminPassword(password)
    if (emailError || passwordError) {
      setError(emailError || passwordError)
      return
    }
    setSubmitting(true)
    try {
      const res = await loginAdmin(email.trim(), password)
      login(res)
      notify.success('Login successful.')
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message || 'Could not log in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthSplitLayout
      title="Admin Login"
      subtitle="Sign in with your admin email and password."
    >
      {error && <p className="alert-danger mb-4" role="alert">{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <label className="label" htmlFor="adminEmail">Email</label>
        <input
          id="adminEmail"
          type="email"
          className="input-field mb-4"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError('') }}
          autoComplete="username"
          autoFocus
        />
        <label className="label" htmlFor="adminPassword">Password</label>
        <input
          id="adminPassword"
          type="password"
          className="input-field mb-2"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError('') }}
          autoComplete="current-password"
        />
        <div className="mb-4 text-right">
          <Link to="/admin/forgot-password" className="ds-link">Forgot password?</Link>
        </div>
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Log in'}
        </button>
      </form>
    </AuthSplitLayout>
  )
}

export default AdminLoginPage
