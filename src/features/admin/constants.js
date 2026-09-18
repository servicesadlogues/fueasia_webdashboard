export const MEMBER_PAGE_SIZE = 10
export const ADMIN_LIST_PAGE_SIZE = MEMBER_PAGE_SIZE
export const SPEAKER_FILTER_YEAR_START = 2024

export const speakerFilterYears = () => {
  const currentYear = new Date().getFullYear()
  const startYear = Math.min(SPEAKER_FILTER_YEAR_START, currentYear)
  return Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index)
}
