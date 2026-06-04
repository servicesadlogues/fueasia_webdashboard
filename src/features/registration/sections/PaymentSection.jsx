import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-toastify'
import { getCaptcha, verifyCaptcha, validateCoupon } from '../../../services/api'
import { useFormContext } from '../FormContext'

const BASE_PRICE_USD = 99
const PROMO_COUPON = 'FUEGLOBALMEMBER'

const PaymentSection = ({ register, errors }) => {
  const { appliedCoupon, setAppliedCoupon } = useFormContext()

  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')
  const [applyingCoupon, setApplyingCoupon] = useState(false)
  const [captchaSvg, setCaptchaSvg] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [verifyingCaptcha, setVerifyingCaptcha] = useState(false)

  const fetchCaptcha = useCallback(async () => {
    const res = await getCaptcha()
    setCaptchaSvg(res.svg)
    setCaptchaToken(res.token)
    setCaptchaInput('')
    setCaptchaVerified(false)
  }, [])

  useEffect(() => {
    fetchCaptcha()
  }, [fetchCaptcha])

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase()
    if (!code) {
      setCouponError('Please enter a coupon code.')
      return
    }
    setCouponError('')
    setApplyingCoupon(true)
    try {
      const res = await validateCoupon(code)
      setAppliedCoupon(res.coupon)
      toast.success(`Coupon applied — ${res.coupon.discountPercent}% off!`)
    } catch (err) {
      setAppliedCoupon(null)
      setCouponError(err.message || 'Invalid or expired coupon code.')
    } finally {
      setApplyingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponInput('')
    setCouponError('')
  }

  const handleVerifyCaptcha = async () => {
    if (!captchaInput.trim()) return toast.error('Please enter the captcha.')
    setVerifyingCaptcha(true)
    try {
      await verifyCaptcha({ token: captchaToken, answer: captchaInput })
      setCaptchaVerified(true)
      toast.success('Captcha verified!')
    } catch (err) {
      toast.error(err.message || 'Incorrect captcha. Please try again.')
      fetchCaptcha()
    } finally {
      setVerifyingCaptcha(false)
    }
  }

  const discountPercent = appliedCoupon?.discountPercent || 0
  const discounted = BASE_PRICE_USD - Math.round((BASE_PRICE_USD * discountPercent) / 100)

  const handleCopyPromoCoupon = () => {
    navigator.clipboard.writeText(PROMO_COUPON)
    toast.info(`Coupon code "${PROMO_COUPON}" copied!`)
  }

  return (
    <div className="section-card">
      <div className="section-header">Payment Details</div>
      <div className="section-body">

        <div className="bg-primary-light border border-primary-border rounded-lg p-6 mb-6">

          {/* Coupon input row */}
          <div className="mb-3">
            <label className="label">Apply Coupon</label>
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError('') }}
                  placeholder="Enter coupon code"
                  disabled={!!appliedCoupon}
                  className="input-field"
                />
                {couponError && <p className="error-text">{couponError}</p>}
              </div>
              {!appliedCoupon ? (
                <button type="button" onClick={handleApplyCoupon} disabled={applyingCoupon} className="btn-primary h-[42px]">
                  {applyingCoupon ? 'Applying...' : 'Apply'}
                </button>
              ) : (
                <button type="button" onClick={handleRemoveCoupon} className="h-[42px] px-5 text-sm border border-red-300 text-red-500 rounded hover:bg-red-50 transition-colors">
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Promo offer row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-gray-700">
              Avail this offer for <strong className="text-primary">10% OFF</strong>
            </span>
            <button type="button" onClick={handleCopyPromoCoupon} className="btn-primary text-sm px-4 py-1.5">
              Copy Coupon
            </button>
          </div>

          {/* Coupon applied success */}
          {appliedCoupon && (
            <div className="flex items-center gap-2 mb-4 text-green-700 bg-green-50 border border-green-200 rounded px-4 py-2">
              <span className="text-base">&#10003;</span>
              <p className="text-sm font-medium">
                <strong>{appliedCoupon.code}</strong> applied — <strong>{appliedCoupon.discountPercent}% flat off</strong>
              </p>
            </div>
          )}

          {/* Price summary — always USD */}
          <div className="mt-2 text-sm">
            <span className="text-gray-500">Membership Fee: </span>
            {discountPercent > 0 && (
              <span className="line-through text-gray-400 mr-2">${BASE_PRICE_USD}</span>
            )}
            <span className="text-primary font-bold text-lg">${discounted}</span>
            {discountPercent > 0 && (
              <span className="ml-2 text-green-600 font-medium">({discountPercent}% off)</span>
            )}
            <span className="ml-1 text-gray-400 text-xs">USD</span>
          </div>
        </div>

        {/* Certification checkboxes */}
        <div className="mb-5 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('certifyCheck')}
              className="accent-primary w-4 h-4 mt-0.5 flex-shrink-0"
            />
            <span className="text-sm text-gray-700">
              I hereby certify that information provided by me is accurate. I will be responsible for disqualification if found otherwise.
            </span>
          </label>
          {errors.certifyCheck && <p className="error-text">{errors.certifyCheck.message}</p>}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('termsCheck')}
              className="accent-primary w-4 h-4 flex-shrink-0"
            />
            <span className="text-sm text-gray-700">
              I agree with{' '}
              <a href="#" className="text-primary underline">terms and conditions</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 underline">Privacy policy</a>
            </span>
          </label>
          {errors.termsCheck && <p className="error-text">{errors.termsCheck.message}</p>}
        </div>

        {/* Captcha */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="bg-gray-200 rounded px-3 py-2"
              dangerouslySetInnerHTML={{ __html: captchaSvg }}
            />
            <button
              type="button"
              onClick={fetchCaptcha}
              className="text-gray-500 hover:text-primary text-xl transition-colors"
              title="Refresh captcha"
            >
              &#x21bb;
            </button>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              className="input-field max-w-[160px]"
              placeholder="Enter captcha"
              disabled={captchaVerified}
            />
            {!captchaVerified ? (
              <button
                type="button"
                onClick={handleVerifyCaptcha}
                disabled={verifyingCaptcha}
                className="px-5 py-2.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                {verifyingCaptcha ? 'Checking...' : 'Check'}
              </button>
            ) : (
              <span className="text-green-600 text-sm font-medium">&#10003; Verified</span>
            )}
          </div>
        </div>

        {/* Hidden field to pass captchaVerified status to parent */}
        <input type="hidden" {...register('_captchaVerified')} value={captchaVerified ? 'yes' : ''} />

      </div>
    </div>
  )
}

export default PaymentSection
