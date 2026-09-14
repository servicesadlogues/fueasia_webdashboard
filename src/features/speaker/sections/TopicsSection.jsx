import { useFieldArray } from 'react-hook-form'

const MAX_TOPICS = 4

const fieldError = (errors, index, name) =>
  errors?.topics?.[index]?.[name]?.message || errors?.topics?.[index]?.message

const TopicsSection = ({ register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'topics' })

  return (
    <div className="section-card">
      <div className="section-header">4. Suggested Topics of Interest (up to 4)</div>
      <div className="section-body">
        {errors.topics?.message && (
          <p className="error-text mb-4">{errors.topics.message}</p>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="mb-8 pb-8 border-b border-gray-200 last:mb-0 last:pb-0 last:border-b-0">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="font-semibold text-navy">Suggested Topic of Interest {index + 1}</p>
              {fields.length > 1 && (
                <button
                  type="button"
                  className="btn-ghost !py-1.5 !px-3 text-sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              )}
            </div>

            <div className="mb-5">
              <label className="label">Suggested Topic of Interest {index + 1} <span className="text-red-500">*</span></label>
              <input {...register(`topics.${index}.topic`)} className="input-field" />
              {fieldError(errors, index, 'topic') && (
                <p className="error-text">{fieldError(errors, index, 'topic')}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="label">Abstract/Summary (200-300 words with references) <span className="text-red-500">*</span></label>
              <textarea
                {...register(`topics.${index}.abstract`)}
                rows={5}
                className="input-field resize-y min-h-[120px]"
              />
              {fieldError(errors, index, 'abstract') && (
                <p className="error-text">{fieldError(errors, index, 'abstract')}</p>
              )}
            </div>

            <div>
              <label className="label">Preferred Session Format <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-6 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register(`topics.${index}.sessionLecture`)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm">Lecture</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register(`topics.${index}.sessionWorkshop`)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm">Workshop</span>
                </label>
              </div>
              {fieldError(errors, index, 'sessionLecture') && (
                <p className="error-text">{fieldError(errors, index, 'sessionLecture')}</p>
              )}
            </div>
          </div>
        ))}

        {fields.length < MAX_TOPICS && (
          <button
            type="button"
            className="btn-primary"
            onClick={() => append({ topic: '', abstract: '', sessionLecture: false, sessionWorkshop: false })}
          >
            + Add Another Topic
          </button>
        )}
      </div>
    </div>
  )
}

export default TopicsSection
