const ShortBio = ({ register, errors }) => (
  <div className="section-card">
    <div className="section-header">3. Short Bio (150-200 words)</div>
    <div className="section-body">
      <label className="label">Short Bio <span className="text-red-500">*</span></label>
      <textarea
        {...register('shortBio')}
        rows={6}
        className="input-field resize-y min-h-[140px]"
      />
      {errors.shortBio && <p className="error-text">{errors.shortBio.message}</p>}
    </div>
  </div>
)

export default ShortBio
