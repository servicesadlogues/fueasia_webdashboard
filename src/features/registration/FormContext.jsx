import { createContext, useContext, useState } from 'react'

const FormContext = createContext(null)

export const FormProvider = ({ children }) => {
  // One token per form session — identifies this user's temp upload folder
  const [sessionToken] = useState(() => crypto.randomUUID())
  const [documentsUploaded, setDocumentsUploaded] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  return (
    <FormContext.Provider value={{
      sessionToken,
      documentsUploaded, setDocumentsUploaded,
      appliedCoupon, setAppliedCoupon,
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
