import { createContext, useContext, useState } from 'react'
import { REQUIRED_SPEAKER_DOCS } from './constants'

const emptyUploadedDocs = () =>
  REQUIRED_SPEAKER_DOCS.reduce((acc, key) => ({ ...acc, [key]: false }), {})

const FormContext = createContext(null)

export const FormProvider = ({ children, onResetForm }) => {
  const [sessionToken] = useState(() => crypto.randomUUID())
  const [uploadedDocs, setUploadedDocs] = useState(emptyUploadedDocs)

  const markDocsUploaded = (paths = {}) => {
    setUploadedDocs((current) => {
      const next = { ...current }
      REQUIRED_SPEAKER_DOCS.forEach((key) => {
        if (paths[key]) next[key] = true
      })
      return next
    })
  }

  const clearDocUploaded = (key) => {
    setUploadedDocs((current) => ({ ...current, [key]: false }))
  }

  const allRequiredDocsUploaded = REQUIRED_SPEAKER_DOCS.every((key) => uploadedDocs[key])

  return (
    <FormContext.Provider value={{
      sessionToken,
      uploadedDocs,
      markDocsUploaded,
      clearDocUploaded,
      allRequiredDocsUploaded,
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
