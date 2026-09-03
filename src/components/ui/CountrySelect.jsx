import Select from 'react-select'
import { countryOptions } from '../../utils/countries'
import { countrySelectMenuProps, countrySelectStyles } from '../../utils/reactSelectStyles'

const CountrySelect = ({
  value,
  onChange,
  isDisabled = false,
  placeholder = 'Search and select country...',
}) => (
  <Select
    options={countryOptions}
    isSearchable
    isDisabled={isDisabled}
    placeholder={placeholder}
    styles={countrySelectStyles}
    {...countrySelectMenuProps}
    value={countryOptions.find((option) => option.value === value) || null}
    onChange={(selected) => onChange(selected ? selected.value : '')}
  />
)

export default CountrySelect
