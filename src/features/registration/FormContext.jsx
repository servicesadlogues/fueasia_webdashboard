import { createContext, useContext, useState } from 'react'

const FormContext = createContext(null)

export const FormProvider = ({ children, onResetForm }) => {
  const [sessionToken] = useState(() => crypto.randomUUID())
  const [documentsUploaded, setDocumentsUploaded] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [captchaPassToken, setCaptchaPassToken] = useState('')

  return (
    <FormContext.Provider value={{
      sessionToken,
      documentsUploaded, setDocumentsUploaded,
      appliedCoupon, setAppliedCoupon,
      captchaVerified, setCaptchaVerified,
      captchaPassToken, setCaptchaPassToken,
      onResetForm,
    }}>
      {children}
    </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('useFormContext must be used inside FormProvider')
  return ctx
}
