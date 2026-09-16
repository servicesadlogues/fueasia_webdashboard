import { createContext, useContext, useState } from 'react'

const RegistrationFormContext = createContext(null)

export const RegistrationFormProvider = ({ children, onResetForm }) => {
  const [sessionToken] = useState(() => crypto.randomUUID())
  const [documentsUploaded, setDocumentsUploaded] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [captchaPassToken, setCaptchaPassToken] = useState('')

  return (
    <RegistrationFormContext.Provider value={{
      sessionToken,
      documentsUploaded, setDocumentsUploaded,
      appliedCoupon, setAppliedCoupon,
      captchaVerified, setCaptchaVerified,
      captchaPassToken, setCaptchaPassToken,
      onResetForm,
    }}>
      {children}
    </RegistrationFormContext.Provider>
  )
}

export const useRegistrationForm = () => {
  const ctx = useContext(RegistrationFormContext)
  if (!ctx) throw new Error('useRegistrationForm must be used inside RegistrationFormProvider')
  return ctx
}

export const FormProvider = RegistrationFormProvider
