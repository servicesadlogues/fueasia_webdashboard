import { Controller } from 'react-hook-form'
import { CountrySelect } from '../../../components/ui'

const TITLE_OPTIONS = ['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.']

const FieldError = ({ error }) => (error ? <p className="error-text">{error.message}</p> : null)

const RequiredMark = () => <span className="text-red-500">*</span>

const PersonalInfo = ({ register, control, errors }) => (
  <div className="section-card">
    <div className="section-header">1. Personal Information</div>
    <div className="section-body">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Full Name (as per passport for permits) <RequiredMark /></label>
          <input {...register('fullName')} className="input-field" />
          <FieldError error={errors.fullName} />
        </div>
        <div>
          <label className="label">Preferred Name (for agenda &amp; badge) <RequiredMark /></label>
          <input {...register('preferredName')} className="input-field" />
          <FieldError error={errors.preferredName} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Title <RequiredMark /></label>
          <select {...register('title')} className="input-field">
            <option value="" />
            {TITLE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <FieldError error={errors.title} />
        </div>
        <div>
          <label className="label">Official designation <RequiredMark /></label>
          <input {...register('designation')} className="input-field" />
          <FieldError error={errors.designation} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Organization/institution <RequiredMark /></label>
          <input {...register('organization')} className="input-field" />
          <FieldError error={errors.organization} />
        </div>
        <div>
          <label className="label">Nationality <RequiredMark /></label>
          <Controller
            name="nationality"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CountrySelect value={value} onChange={onChange} placeholder="" />
            )}
          />
          <FieldError error={errors.nationality} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Foreign Resident? <RequiredMark /></label>
          <select {...register('uaeResident')} className="input-field">
            <option value="" />
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <FieldError error={errors.uaeResident} />
        </div>
        <div>
          <label className="label">Contact Email <RequiredMark /></label>
          <input {...register('contactEmail')} type="email" className="input-field" />
          <FieldError error={errors.contactEmail} />
        </div>
      </div>

      <div className="mb-5">
        <label className="label">Contact Phone <RequiredMark /></label>
        <input {...register('contactPhone')} className="input-field" />
        <FieldError error={errors.contactPhone} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">Instagram</label>
          <input {...register('instagram')} className="input-field" />
        </div>
        <div>
          <label className="label">Facebook</label>
          <input {...register('facebook')} className="input-field" />
        </div>
        <div>
          <label className="label">LinkedIn</label>
          <input {...register('linkedin')} className="input-field" />
        </div>
        <div>
          <label className="label">YouTube</label>
          <input {...register('youtube')} className="input-field" />
        </div>
        <div>
          <label className="label">X (Twitter)</label>
          <input {...register('twitter')} className="input-field" />
        </div>
      </div>
    </div>
  </div>
)

export default PersonalInfo
