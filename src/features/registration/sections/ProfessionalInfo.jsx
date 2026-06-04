const ProfessionalInfo = ({ register, errors }) => (
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
          <input {...register('country')} className="input-field" placeholder="Country of registration" />
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
