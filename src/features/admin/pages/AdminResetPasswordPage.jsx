import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import AuthSplitLayout from '../../../components/auth/AuthSplitLayout'
import { resetAdminPassword } from '../../../services/adminHttp'
import { validateNewAdminPassword } from '../../../utils/adminAuthValidation'
import { PasswordField } from '../../../components/ui'

const AdminResetPasswordPage = () => {
  const [token] = useState(() => String(new URLSearchParams(window.location.search).get('token') || '').trim())
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (token) window.history.replaceState({}, '', '/admin/reset-password')
  }, [token])

  if (!token) {
    return <Navigate to="/admin/forgot-password" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const passwordError = validateNewAdminPassword(password, confirmPassword)
    if (passwordError) {
      setError(passwordError)
      return
    }
    setSubmitting(true)
    try {
      const res = await resetAdminPassword(token, password, confirmPassword)
      notify.success(res.message || 'Password updated. Please log in.')
      navigate('/admin/login', { replace: true })
    } catch (err) {
      setError(err.message || 'Could not update the password. Please request a new link.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthSplitLayout
      title="Create new password"
      subtitle="Choose a new password, then confirm it. You will sign in on the admin login page."
    >
      {error && <p className="alert-danger mb-4" role="alert">{error}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <label className="label" htmlFor="newPassword">New password</label>
        <PasswordField
          id="newPassword"
          className="mb-4"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError('') }}
          autoComplete="new-password"
          autoFocus
        />
        <label className="label" htmlFor="confirmPassword">Confirm password</label>
        <PasswordField
          id="confirmPassword"
          className="mb-4"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
          autoComplete="new-password"
        />
        <p className="ds-caption mb-4">Use 8–128 characters with at least one letter and one number.</p>
        <button type="submit" className="btn-primary w-full mb-4" disabled={submitting}>
          {submitting ? 'Saving...' : 'Update password'}
        </button>
        <p className="text-center">
          <Link to="/admin/login" className="ds-link">Back to login</Link>
        </p>
      </form>
    </AuthSplitLayout>
  )
}

export default AdminResetPasswordPage
