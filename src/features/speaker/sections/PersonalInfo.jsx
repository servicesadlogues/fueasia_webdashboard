import { Controller } from 'react-hook-form'
import { CountrySelect } from '../../../components/ui'

const TITLE_OPTIONS = ['', 'Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.']

const PersonalInfo = ({ register, control, errors }) => (
  <div className="section-card">
    <div className="section-header">1. Personal Information</div>
    <div className="section-body">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Full Name (as per passport for permits) <span className="text-red-500">*</span></label>
          <input {...register('fullName')} className="input-field" />
          {errors.fullName && <p className="error-text">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="label">Preferred Name (for agenda &amp; badge)</label>
          <input {...register('preferredName')} className="input-field" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Title</label>
          <select {...register('title')} className="input-field">
            {TITLE_OPTIONS.map((option) => (
              <option key={option || 'blank'} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Official designation</label>
          <input {...register('designation')} className="input-field" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Organization/institution</label>
          <input {...register('organization')} className="input-field" />
        </div>
        <div>
          <label className="label">Nationality</label>
          <Controller
            name="nationality"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CountrySelect value={value} onChange={onChange} placeholder="" />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">UAE Resident?</label>
          <select {...register('uaeResident')} className="input-field">
            <option value="" />
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label className="label">Contact Email <span className="text-red-500">*</span></label>
          <input {...register('contactEmail')} type="email" className="input-field" />
          {errors.contactEmail && <p className="error-text">{errors.contactEmail.message}</p>}
        </div>
      </div>

      <div className="mb-5">
        <label className="label">Contact Phone (UAE format: 9715xxxxxxxx)</label>
        <input {...register('contactPhone')} className="input-field" />
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
