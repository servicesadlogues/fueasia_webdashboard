import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

import { registrationSchema } from '../../utils/validators'
import { FormProvider, useFormContext } from './FormContext'
import PersonalInfo from './sections/PersonalInfo'
import ProfessionalInfo from './sections/ProfessionalInfo'
import Speciality from './sections/Speciality'
import DocumentUpload from './sections/DocumentUpload'
import PaymentSection from './sections/PaymentSection'

import { createPaymentOrder, verifyPayment } from '../../services/api'
import useRazorpay from '../../hooks/useRazorpay'

// ─── Loading Screen ───────────────────────────────────────────────────────────
const LoadingScreen = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
    <h3 className="text-navy font-semibold text-xl mb-2">Processing your registration...</h3>
    <p className="text-gray-500 text-sm text-center">Please wait. Do not close or refresh this page.</p>
  </div>
)

// ─── Success Card ─────────────────────────────────────────────────────────────
const SuccessCard = ({ data, onRegisterAnother }) => {
  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-navy mb-1">Registration Successful!</h2>
        {data.email && (
          <p className="text-gray-500 text-sm mb-6">
            A confirmation email has been sent to <strong>{data.email}</strong>
          </p>
        )}

        <div className="bg-primary-light border border-primary-border rounded-lg p-5 mb-6 text-left">
          <p className="text-xs text-gray-500 mb-1">Your Membership ID</p>
          <p className="text-primary font-bold text-2xl tracking-widest mb-4">{data.membershipId}</p>
          <div className="text-sm space-y-2">
            {data.name && (
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium">{data.name}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Valid Until</span>
              <span className="font-medium">{formatDate(data.expiryDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-6">
          Please save your Membership ID for conference participation and member benefits.
        </p>

        <button onClick={onRegisterAnother} className="btn-primary w-full">
          Register Another Member
        </button>
      </div>
    </div>
  )
}

// ─── Failed Card ──────────────────────────────────────────────────────────────
const FailedCard = ({ error, onRetry }) => (
  <div className="max-w-lg mx-auto px-4 py-16 text-center">
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-navy mb-2">Payment Failed</h2>
      <p className="text-gray-500 text-sm mb-6">
        {error || 'Your payment could not be processed. No amount has been deducted.'}
      </p>
      <div className="space-y-3">
        <button onClick={onRetry} className="btn-primary w-full">
          Try Again
        </button>
        <a href="mailto:info@fueasia.com" className="block text-sm text-primary underline">
          Contact Support
        </a>
      </div>
    </div>
  </div>
)

// ─── Main Form ────────────────────────────────────────────────────────────────
const RegistrationFormInner = () => {
  const { openPayment } = useRazorpay()
  const { sessionToken, appliedCoupon } = useFormContext()

  // null → form | 'loading' → loader | 'success' → success card | 'failed' → failed card
  const [flowStatus, setFlowStatus] = useState(null)
  const [flowData, setFlowData] = useState(null)
  const [flowError, setFlowError] = useState('')

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      gender: '',
      mobileCountryCode: '+91',
      otherAssociations: [],
    },
  })

  const handleRegisterAnother = () => {
    setFlowStatus(null)
    setFlowData(null)
    setFlowError('')
    reset()
  }

  const onSubmit = async (data) => {
    const currency = 'USD'
    const memberType = 'fueasia'

    try {
      // 1. Create order with full form data
      const orderRes = await createPaymentOrder({
        ...data,
        memberType,
        currency,
        sessionToken,
        couponCode: appliedCoupon?.code || '',
      })

      // 2. Open Razorpay modal
      openPayment({
        orderId:  orderRes.orderId,
        amount:   orderRes.amount,
        currency: orderRes.currency,
        keyId:    orderRes.keyId,
        name:     data.name,
        email:    data.email,
        mobile:   data.mobile,

        onSuccess: async ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {
          // Show loader immediately — no redirect, no flicker
          setFlowStatus('loading')
          try {
            const regRes = await verifyPayment({ razorpayOrderId, razorpayPaymentId, razorpaySignature })
            setFlowData({
              membershipId: regRes.membershipId,
              expiryDate:   regRes.expiryDate,
              name:         data.name,
              email:        data.email,
            })
            setFlowStatus('success')
          } catch (err) {
            setFlowError(err.message || 'Registration failed after payment. Please contact support with your email.')
            setFlowStatus('failed')
          }
        },

        onFailure: (msg) => {
          setFlowError(msg || 'Payment was not completed. Please try again.')
          setFlowStatus('failed')
        },
      })
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.')
    }
  }

  // ── Status-based rendering — no page redirects ────────────────────────────
  if (flowStatus === 'loading') return <LoadingScreen />
  if (flowStatus === 'success') return <SuccessCard data={flowData} onRegisterAnother={handleRegisterAnother} />
  if (flowStatus === 'failed')  return <FailedCard error={flowError} onRetry={handleRegisterAnother} />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h2 className="text-navy font-bold text-2xl mb-1">
            FUE Asia Membership Registration
          </h2>
          <p className="text-gray-500 text-sm">
            All fields marked with <span className="text-red-500">*</span> are required.
          </p>
        </div>

        <PersonalInfo register={register} control={control} errors={errors} />
        <ProfessionalInfo register={register} control={control} errors={errors} />
        <Speciality register={register} control={control} errors={errors} />
        <DocumentUpload />
        <PaymentSection register={register} errors={errors} />

        <div className="mt-2">
          <button type="submit" disabled={isSubmitting} className="btn-primary text-base px-8 py-3">
            {isSubmitting ? 'Processing...' : 'Confirm Payment'}
          </button>
        </div>

      </div>
    </form>
  )
}

const RegistrationForm = () => (
  <FormProvider>
    <RegistrationFormInner />
  </FormProvider>
)

export default RegistrationForm
