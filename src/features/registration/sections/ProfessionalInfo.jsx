import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { countryOptions } from '../../../utils/countries'

const token = (name, fallback) => {
  if (typeof document === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: token('--color-input', '#f9fafb'),
    borderColor: state.isFocused ? token('--color-primary', '#F07800') : token('--color-border', '#e5e7eb'),
    boxShadow: 'none',
    minHeight: token('--control-h', '42px'),
    fontSize: token('--text-sm', '14px'),
    '&:hover': { borderColor: token('--color-primary', '#F07800') },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? token('--color-primary', '#F07800')
      : state.isFocused
        ? token('--color-primary-light', '#fff3e0')
        : token('--color-surface', '#fff'),
    color: state.isSelected ? token('--color-on-brand', '#fff') : token('--color-body', '#374151'),
    fontSize: token('--text-sm', '14px'),
  }),
  placeholder: (base) => ({ ...base, color: token('--color-faint', '#9ca3af'), fontSize: token('--text-sm', '14px') }),
  singleValue: (base) => ({ ...base, fontSize: token('--text-sm', '14px') }),
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
