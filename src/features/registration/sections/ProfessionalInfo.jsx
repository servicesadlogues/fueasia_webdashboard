import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { countryOptions } from '../../../utils/countries'

const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#f9fafb',
    borderColor: state.isFocused ? '#F07800' : '#e5e7eb',
    boxShadow: 'none',
    minHeight: '42px',
    fontSize: '14px',
    '&:hover': { borderColor: '#F07800' },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#F07800' : state.isFocused ? '#fff3e0' : '#fff',
    color: state.isSelected ? '#fff' : '#374151',
    fontSize: '14px',
  }),
  placeholder: (base) => ({ ...base, color: '#9ca3af', fontSize: '14px' }),
  singleValue: (base) => ({ ...base, fontSize: '14px' }),
}

const ProfessionalInfo = ({ register, control, errors }) => (
  <div className="section-card">
    <div className="section-header">Professional Information</div>
    <div className="section-body">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className="label">Medical Number <span className="text-red-500">*</span></label>
          <input {...register('medicalNumber')} className="input-field" placeholder="Medical registration number" />
          {errors.medicalNumber && <p className="error-text">{errors.medicalNumber.message}</p>}
        </div>
        <div>
          <label className="label">Country <span className="text-red-500">*</span></label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                options={countryOptions}
                isSearchable
                placeholder="Search and select country..."
                styles={selectStyles}
                value={countryOptions.find((o) => o.value === field.value) || null}
                onChange={(selected) => field.onChange(selected ? selected.value : '')}
              />
            )}
          />
          {errors.country && <p className="error-text">{errors.country.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Issuing Authority <span className="text-red-500">*</span></label>
        <input {...register('issuingAuthority')} className="input-field" placeholder="e.g. Medical Council of India" />
        {errors.issuingAuthority && <p className="error-text">{errors.issuingAuthority.message}</p>}
      </div>

    </div>
  </div>
)

export default ProfessionalInfo
