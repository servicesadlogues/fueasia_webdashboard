import { createContext, useContext, useState } from 'react'
import { REQUIRED_SPEAKER_DOCS } from './constants'

const emptyUploadedDocs = () =>
  REQUIRED_SPEAKER_DOCS.reduce((acc, key) => ({ ...acc, [key]: false }), {})

const SpeakerFormContext = createContext(null)

export const SpeakerFormProvider = ({ children, onResetForm }) => {
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
    <SpeakerFormContext.Provider value={{
      sessionToken,
      uploadedDocs,
      markDocsUploaded,
      clearDocUploaded,
      allRequiredDocsUploaded,
      onResetForm,
    }}>
      {children}
    </SpeakerFormContext.Provider>
  )
}

export const useSpeakerForm = () => {
  const ctx = useContext(SpeakerFormContext)
  if (!ctx) throw new Error('useSpeakerForm must be used inside SpeakerFormProvider')
  return ctx
}

export const FormProvider = SpeakerFormProvider
