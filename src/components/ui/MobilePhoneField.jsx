import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {
  formatCountryCode,
  nationalFromPhoneInput,
  normalizeDialCode,
  toPhoneInputValue,
} from '../../utils/mobile'

const MobilePhoneField = ({
  value,
  onChange,
  countryCode = '+91',
  onCountryCodeChange,
  disabled = false,
  inputName = 'mobile',
}) => {
  const dial = normalizeDialCode(countryCode)

  return (
    <PhoneInput
      country="in"
      enableSearch
      disableCountryGuess
      countryCodeEditable={false}
      disabled={disabled}
      value={toPhoneInputValue(value, dial)}
      onChange={(phone, data) => {
        const nextDial = data?.dialCode || dial
        onCountryCodeChange?.(formatCountryCode(nextDial))
        onChange(nationalFromPhoneInput(phone, nextDial))
      }}
      inputProps={{ name: inputName, disabled }}
    />
  )
}

export default MobilePhoneField
