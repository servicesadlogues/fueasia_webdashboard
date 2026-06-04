import { useWatch } from 'react-hook-form'

const SPECIALITIES = [
  { value: 'dermatologist', label: 'Dermatologist' },
  { value: 'plastic_surgeon', label: 'Plastic Surgeon' },
  { value: 'other', label: 'Other' },
]

const OTHER_ASSOCIATIONS = [
  'IADVL',
  'APSI (Association of Plastic Surgeons of India)',
  'Indian Association of Dermatologists Venereologists and Leprologists',
  'Middle East International Dermatology & Aesthetic Medicine',
  'Emirates Plastic Surgery Association',
]

const Speciality = ({ register, control, errors }) => {
  const speciality = useWatch({ control, name: 'speciality' })

  return (
    <div className="section-card">
      <div className="section-header">Speciality</div>
      <div className="section-body">

        {/* Speciality radio */}
        <div className="mb-5">
          <div className="flex flex-col gap-3">
            {SPECIALITIES.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value={value}
                  {...register('speciality')}
                  className="accent-primary w-4 h-4"
                />
                <span className="text-sm">{label}</span>
                {value === 'other' && speciality === 'other' && (
                  <input
                    {...register('specialityOther')}
                    className="input-field max-w-xs ml-2"
                    placeholder="Specify speciality"
                  />
                )}
              </label>
            ))}
          </div>
          {errors.speciality && <p className="error-text mt-2">{errors.speciality.message}</p>}
          {errors.specialityOther && <p className="error-text">{errors.specialityOther.message}</p>}
        </div>

        {/* Other associations */}
        <div className="mb-5">
          <p className="font-semibold text-sm mb-3">Other associations:</p>
          <div className="flex flex-col gap-2">
            {OTHER_ASSOCIATIONS.map((assoc) => (
              <label key={assoc} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={assoc}
                  {...register('otherAssociations')}
                  className="accent-primary w-4 h-4"
                />
                <span className="text-sm text-gray-700">{assoc}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ref No */}
        <div>
          <input
            {...register('refNo')}
            className="input-field bg-gray-100"
            placeholder="Ref no (optional)"
          />
        </div>

      </div>
    </div>
  )
}

export default Speciality
