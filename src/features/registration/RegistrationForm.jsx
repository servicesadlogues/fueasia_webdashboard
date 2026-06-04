import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
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

const RegistrationFormInner = () => {
  const navigate = useNavigate()
  const { openPayment } = useRazorpay()
  const { sessionToken, documentsUploaded, appliedCoupon } = useFormContext()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      gender: '',
      mobileCountryCode: '+91',
      otherAssociations: [],
    },
  })

  const onSubmit = async (data) => {
    if (!documentsUploaded) {
      toast.error('Please upload all documents before proceeding.')
      return
    }

    const currency = 'USD'
    const memberType = 'fueasia'

    try {
      // 1. Create order — send ALL form data so backend can recover via webhook
      //    if user closes browser after paying but before verify completes
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
          try {
            // 3. Verify + register in one call — backend creates member from stored data
            const regRes = await verifyPayment({ razorpayOrderId, razorpayPaymentId, razorpaySignature })

            navigate('/payment-success', {
              state: {
                membershipId: regRes.membershipId,
                expiryDate:   regRes.expiryDate,
                name:  data.name,
                email: data.email,
              },
            })
          } catch (err) {
            toast.error(err.message || 'Payment succeeded but registration failed. Please contact support with your email.')
            navigate('/payment-failed')
          }
        },

        onFailure: (msg) => {
          toast.error(msg || 'Payment was not completed.')
          navigate('/payment-failed')
        },
      })
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="max-w-5xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h2 className="text-navy font-bold text-2xl mb-1">
            FUE Asia Membership Registration
          </h2>
          <p className="text-gray-500 text-sm">All fields marked with <span className="text-red-500">*</span> are required.</p>
        </div>

        <PersonalInfo register={register} control={control} errors={errors} />
        <ProfessionalInfo register={register} errors={errors} />
        <Speciality register={register} control={control} errors={errors} />
        <DocumentUpload />
        <PaymentSection
          register={register}
          errors={errors}
        />

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
