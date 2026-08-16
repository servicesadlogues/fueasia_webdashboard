import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { notify } from '../utils/notify'
import { requestMemberOtp, verifyMemberOtp } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { normalizeMembershipId, validateMembershipId, validateOtp } from '../utils/authValidation'
import AuthSplitLayout from '../components/auth/AuthSplitLayout'
import AuthBusy from '../components/auth/AuthBusy'
import AuthSwitchLink from '../components/auth/AuthSwitchLink'

const OTP_LENGTH = 6

const LoginPage = () => {
  const { isAuthenticated, loading, login } = useAuth()
  const navigate = useNavigate()

  const [membershipId, setMembershipId] = useState('')
  const [step, setStep] = useState('id')
  const [maskedEmail, setMaskedEmail] = useState('')
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const inputsRef = useRef([])

  useEffect(() => {
    if (cooldown <= 0) return undefined
    const t = setInterval(() => setCooldown((s) => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  if (loading) return <AuthBusy />

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    const id = normalizeMembershipId(membershipId)
    const idError = validateMembershipId(id)
    if (idError) {
      setError(idError)
      return
    }
    setSending(true)
    try {
      const res = await requestMemberOtp(id)
      setMembershipId(id)
      setMaskedEmail(res.maskedEmail || '')
      setOtp(Array(OTP_LENGTH).fill(''))
      setStep('otp')
      setCooldown(60)
      notify.success(res.message || 'OTP sent to your registered email.')
      setTimeout(() => inputsRef.current[0]?.focus(), 50)
    } catch (err) {
      setError(err.message || 'Could not send OTP. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    setError('')
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((ch, i) => { next[i] = ch })
    setOtp(next)
    const focusAt = Math.min(pasted.length, OTP_LENGTH - 1)
    inputsRef.current[focusAt]?.focus()
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    setError('')
    const code = otp.join('')
    const otpError = validateOtp(code)
    if (otpError) {
      setError(otpError)
      return
    }
    setVerifying(true)
    try {
      const res = await verifyMemberOtp(membershipId, code)
      login(res)
      notify.success('Login successful.')
      navigate('/home', { replace: true })
    } catch (err) {
      setError(err.message || 'OTP verification failed. Please try again.')
      setOtp(Array(OTP_LENGTH).fill(''))
      inputsRef.current[0]?.focus()
    } finally {
      setVerifying(false)
    }
  }

  const handleResend = async () => {
    if (cooldown > 0 || sending) return
    setError('')
    setSending(true)
    try {
      const res = await requestMemberOtp(membershipId)
      setMaskedEmail(res.maskedEmail || maskedEmail)
      setOtp(Array(OTP_LENGTH).fill(''))
      setCooldown(res.retryAfter || 60)
      notify.success(res.message || 'A new OTP has been sent.')
      inputsRef.current[0]?.focus()
    } catch (err) {
      if (err.retryAfter) setCooldown(Number(err.retryAfter) || 60)
      setError(err.message || 'Could not resend OTP.')
    } finally {
      setSending(false)
    }
  }

  return (
    <AuthSplitLayout
      title="Member Login"
      subtitle="Sign in with your Membership ID. We will email a one-time code to your registered address."
    >
      {error && <p className="alert-danger mb-4" role="alert">{error}</p>}

      {step === 'id' && (
        <form onSubmit={handleSendOtp} noValidate>
          <label className="label" htmlFor="membershipId">Membership ID</label>
          <input
            id="membershipId"
            className="input-field mb-4"
            value={membershipId}
            onChange={(e) => { setMembershipId(e.target.value.toUpperCase()); setError('') }}
            placeholder="e.g. FUEGLOBAL202601"
            autoComplete="username"
            autoFocus
          />
          <button type="submit" className="btn-primary w-full" disabled={sending}>
            {sending ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerify} noValidate>
          <p className="ds-body text-center mb-4">
            OTP sent to <strong>{maskedEmail}</strong>
          </p>
          <div className="otp-row mb-4" onPaste={handleOtpPaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputsRef.current[i] = el }}
                className="otp-box"
                inputMode="numeric"
                autoComplete={i === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                aria-label={`OTP digit ${i + 1}`}
              />
            ))}
          </div>
          <button type="submit" className="btn-primary w-full mb-3" disabled={verifying}>
            {verifying ? 'Verifying...' : 'Verify OTP'}
          </button>
          <div className="text-center">
            <button
              type="button"
              className="ds-link"
              onClick={handleResend}
              disabled={sending || cooldown > 0}
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
            </button>
            <button
              type="button"
              className="block mx-auto mt-3 ds-muted"
              onClick={() => { setStep('id'); setOtp(Array(OTP_LENGTH).fill('')); setError('') }}
            >
              Use a different Membership ID
            </button>
          </div>
        </form>
      )}
      <AuthSwitchLink
        prompt="Haven't registered yet?"
        to="/"
        label="Register as a new member"
      />
    </AuthSplitLayout>
  )
}

export default LoginPage
