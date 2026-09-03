const cssToken = (name, fallback) => {
  if (typeof document === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

const MENU_MAX_HEIGHT = 220

export const countrySelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: cssToken('--color-input', '#f9fafb'),
    borderColor: state.isFocused ? cssToken('--color-primary', '#F07800') : cssToken('--color-border', '#e5e7eb'),
    boxShadow: 'none',
    minHeight: cssToken('--control-h', '42px'),
    fontSize: cssToken('--text-sm', '14px'),
    '&:hover': { borderColor: cssToken('--color-primary', '#F07800') },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? cssToken('--color-primary', '#F07800')
      : state.isFocused
        ? cssToken('--color-primary-light', '#fff3e0')
        : cssToken('--color-surface', '#fff'),
    color: state.isSelected ? cssToken('--color-on-brand', '#fff') : cssToken('--color-body', '#374151'),
    fontSize: cssToken('--text-sm', '14px'),
  }),
  placeholder: (base) => ({ ...base, color: cssToken('--color-faint', '#9ca3af'), fontSize: cssToken('--text-sm', '14px') }),
  singleValue: (base) => ({ ...base, fontSize: cssToken('--text-sm', '14px') }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  menuList: (base) => ({ ...base, maxHeight: MENU_MAX_HEIGHT }),
}

export const countrySelectMenuProps = {
  menuPortalTarget: typeof document !== 'undefined' ? document.body : null,
  menuPosition: 'fixed',
}
