const ShortBio = ({ register }) => (
  <div className="section-card">
    <div className="section-header">3. Short Bio (150-200 words)</div>
    <div className="section-body">
      <textarea
        {...register('shortBio')}
        rows={6}
        className="input-field resize-y min-h-[140px]"
      />
    </div>
  </div>
)

export default ShortBio
