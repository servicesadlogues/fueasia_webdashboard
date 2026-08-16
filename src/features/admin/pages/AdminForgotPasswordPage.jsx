import { useState } from 'react'
import { Link } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import AuthSplitLayout from '../../../components/auth/AuthSplitLayout'
import { forgotAdminPassword } from '../../../services/adminHttp'
import { validateAdminEmail } from '../../../utils/adminAuthValidation'

const AdminForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const emailError = validateAdminEmail(email)
    if (emailError) {
      setError(emailError)
      return
    }
    setSubmitting(true)
    try {
      const res = await forgotAdminPassword(email.trim())
      setSent(true)
      notify.success(res.message || 'If that email is registered, we sent a password reset link.')
    } catch (err) {
      setError(err.message || 'Could not send the reset email. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthSplitLayout
      title="Forgot password"
      subtitle="Enter your admin email. If it is registered, we will send a link to create a new password."
    >
      {error && <p className="alert-danger mb-4" role="alert">{error}</p>}
      {sent ? (
        <div>
          <p className="alert-success mb-4">
            If that email is registered, check your inbox for a reset link. It expires in 60 minutes.
          </p>
          <Link to="/admin/login" className="btn-primary w-full">Back to login</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <label className="label" htmlFor="resetEmail">Email</label>
          <input
            id="resetEmail"
            type="email"
            className="input-field mb-4"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder="admin@fueasia.org"
            autoComplete="username"
            autoFocus
          />
          <button type="submit" className="btn-primary w-full mb-4" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send reset link'}
          </button>
          <p className="text-center">
            <Link to="/admin/login" className="ds-link">Back to login</Link>
          </p>
        </form>
      )}
    </AuthSplitLayout>
  )
}

export default AdminForgotPasswordPage
