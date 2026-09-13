import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { notify } from '../../utils/notify'
import { speakerSubmissionSchema } from '../../utils/validators'
import { submitSpeakerRegistration } from '../../services/api'
import { FormProvider, useFormContext } from './FormContext'
import PersonalInfo from './sections/PersonalInfo'
import DocumentUpload from './sections/DocumentUpload'
import ShortBio from './sections/ShortBio'
import TopicsSection from './sections/TopicsSection'
import Agreements from './sections/Agreements'

const LoadingScreen = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
    <div className="spinner mb-6" />
    <h3 className="text-navy font-semibold text-xl mb-2">Saving your submission...</h3>
    <p className="text-gray-500 text-sm text-center">Please wait. Do not close or refresh this page.</p>
  </div>
)

const SuccessCard = ({ data, onSubmitAnother }) => (
  <div className="max-w-lg mx-auto px-4 py-16 text-center">
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-navy mb-2">Submission Saved</h2>
      {data.contactEmail && (
        <p className="text-gray-500 text-sm mb-6">
          A confirmation email has been sent to <strong>{data.contactEmail}</strong>
        </p>
      )}
      {!data.contactEmail && (
        <p className="text-gray-500 text-sm mb-6">
          Your speaker submission has been received successfully.
        </p>
      )}
      <button onClick={onSubmitAnother} className="btn-primary w-full">
        Submit Another Speaker Form
      </button>
    </div>
  </div>
)

const SpeakerFormInner = () => {
  const { sessionToken, onResetForm } = useFormContext()
  const [flowStatus, setFlowStatus] = useState(null)
  const [flowData, setFlowData] = useState(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(speakerSubmissionSchema),
    defaultValues: {
      title: '',
      uaeResident: '',
      nationality: '',
      topics: [{ topic: '', abstract: '', sessionLecture: false, sessionWorkshop: false }],
      agreementScientific: false,
      agreementPhotoBio: false,
      agreementPresentation: false,
      agreementDataStorage: false,
      profileCompleteConfirmed: false,
    },
  })

  const onSubmit = async (data) => {
    setFlowStatus('loading')
    try {
      const res = await submitSpeakerRegistration({
        ...data,
        sessionToken,
      })
      setFlowData(res)
      setFlowStatus('success')
      notify.success('Speaker submission saved successfully.')
    } catch {
      setFlowStatus(null)
    }
  }

  if (flowStatus === 'loading') return <LoadingScreen />
  if (flowStatus === 'success') return <SuccessCard data={flowData} onSubmitAnother={onResetForm} />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-navy font-bold text-3xl mb-1">Speaker Submission Portal</h2>
          <p className="text-navy font-semibold text-xl mb-2">Hair &amp; Beyond Summit 2026</p>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Welcome to the official speaker submission page. Please complete the form and upload all required documents to finalize your participation.
          </p>
          <p className="text-gray-500 text-sm mt-3">
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>
        </div>

        <PersonalInfo register={register} control={control} errors={errors} />
        <DocumentUpload />
        <ShortBio register={register} />
        <TopicsSection register={register} control={control} />
        <Agreements register={register} errors={errors} />

        <div className="mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full text-base py-3"
          >
            {isSubmitting ? 'Saving...' : 'Save Data'}
          </button>
        </div>
      </div>
    </form>
  )
}

const SpeakerForm = () => {
  const [formKey, setFormKey] = useState(0)
  return (
    <FormProvider key={formKey} onResetForm={() => setFormKey((k) => k + 1)}>
      <SpeakerFormInner />
    </FormProvider>
  )
}

export default SpeakerForm
