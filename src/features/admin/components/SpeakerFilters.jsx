import { countryOptions } from '../../../utils/countries'
import { speakerFilterYears } from '../constants'

const SpeakerFilters = ({ value, onChange, search, onSearchChange }) => {
  const set = (key) => (e) => onChange({ ...value, [key]: e.target.value, page: 1 })

  return (
    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input
        className="input-field sm:col-span-2 lg:col-span-1"
        placeholder="Search name, email, speaker ID"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search speakers"
      />
      <select className="input-field" value={value.year || ''} onChange={set('year')} aria-label="Year">
        <option value="">All years</option>
        {speakerFilterYears().map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <select
        className="input-field"
        value={value.nationality || ''}
        onChange={set('nationality')}
        aria-label="Nationality"
      >
        <option value="">All nationalities</option>
        {countryOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <select
        className="input-field"
        value={value.uaeResident || ''}
        onChange={set('uaeResident')}
        aria-label="Foreign resident"
      >
        <option value="">All residents</option>
        <option value="yes">Foreign resident: Yes</option>
        <option value="no">Foreign resident: No</option>
      </select>
    </div>
  )
}

export default SpeakerFilters
