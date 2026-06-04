import { Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PersonalInfo = ({ register, control, errors }) => (
  <div className="section-card">
    <div className="section-header">Personal Information</div>
    <div className="section-body">

      {/* Gender + Date of Birth row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Gender */}
        <div>
          <label className="label">Gender <span className="text-red-500">*</span></label>
          <div className="flex gap-6 mt-1">
            {['male', 'female'].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={g}
                  {...register('gender')}
                  className="accent-primary w-4 h-4"
                />
                <span className="text-sm capitalize">{g}</span>
              </label>
            ))}
          </div>
          {errors.gender && <p className="error-text">{errors.gender.message}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="label">Date of Birth <span className="text-red-500">*</span></label>
          <input
            type="date"
            {...register('dob')}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            min="1900-01-01"
            className="input-field"
          />
          {errors.dob && <p className="error-text">{errors.dob.message}</p>}
        </div>
      </div>

      {/* Row 1: Name + Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Name <span className="text-red-500">*</span></label>
          <input {...register('name')} className="input-field" placeholder="Full name" />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Mobile <span className="text-red-500">*</span></label>
          <Controller
            name="mobile"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                country="in"
                value={value}
                onChange={(phone) => onChange(phone)}
                inputProps={{ name: 'mobile' }}
                enableSearch
              />
            )}
          />
          {errors.mobile && <p className="error-text">{errors.mobile.message}</p>}
        </div>
      </div>

      {/* Row 2: Email + Alternate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Email <span className="text-red-500">*</span></label>
          <input {...register('email')} type="email" className="input-field" placeholder="email@example.com" />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Alternate Number</label>
          <input {...register('alternateNumber')} className="input-field" placeholder="Alternate contact" />
        </div>
      </div>

      {/* Row 3: Institute + Designation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Institute</label>
          <input {...register('institute')} className="input-field" placeholder="Hospital / Institute name" />
        </div>
        <div>
          <label className="label">Designation</label>
          <input {...register('designation')} className="input-field" placeholder="e.g. Senior Consultant" />
        </div>
      </div>

      {/* Row 4: Address + City */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label">Address</label>
          <input {...register('address')} className="input-field" placeholder="Street address" />
        </div>
        <div>
          <label className="label">City</label>
          <input {...register('city')} className="input-field" placeholder="City" />
        </div>
      </div>

    </div>
  </div>
)

export default PersonalInfo
