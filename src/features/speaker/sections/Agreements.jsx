const AGREEMENTS = [
  {
    key: 'agreementScientific',
    label: 'I confirm that my presentation is scientific/non-commercial and complies with DOH/DHA rules.',
  },
  {
    key: 'agreementPhotoBio',
    label: 'I consent to the use of my photo and bio in marketing materials for this event.',
  },
  {
    key: 'agreementPresentation',
    label: 'I agree to provide my final presentation by the deadline communicated by the organizers.',
  },
  {
    key: 'agreementDataStorage',
    label: 'I consent to the storage and processing of my data by Wide Events for this submission.',
  },
]

const Agreements = ({ register, errors }) => (
  <div className="section-card">
    <div className="section-header">5. Agreements &amp; Compliance</div>
    <div className="section-body space-y-4">
      {AGREEMENTS.map(({ key, label }) => (
        <div key={key}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register(key)}
              className="accent-primary w-4 h-4 mt-1 shrink-0"
            />
            <span className="text-sm text-gray-700">
              {label} <span className="text-red-500">*</span>
            </span>
          </label>
          {errors[key] && <p className="error-text ml-7">{errors[key].message}</p>}
        </div>
      ))}

      <div className="mt-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('profileCompleteConfirmed')}
            className="accent-primary w-4 h-4 mt-1 shrink-0"
          />
          <span className="text-sm text-red-600">
            Tick this checkbox only after your profile is complete. Admin will be notified each time you select it &amp; save data. <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.profileCompleteConfirmed && (
          <p className="error-text ml-7">{errors.profileCompleteConfirmed.message}</p>
        )}
      </div>
    </div>
  </div>
)

export default Agreements
