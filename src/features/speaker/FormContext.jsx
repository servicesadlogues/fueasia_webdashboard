import { createContext, useContext, useState } from 'react'

const FormContext = createContext(null)

export const FormProvider = ({ children, onResetForm }) => {
  const [sessionToken] = useState(() => crypto.randomUUID())
  const [documentsUploaded, setDocumentsUploaded] = useState(false)

  return (
    <FormContext.Provider value={{
      sessionToken,
      documentsUploaded,
      setDocumentsUploaded,
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
