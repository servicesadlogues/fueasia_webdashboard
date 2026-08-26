const DATE_OPTIONS = { day: '2-digit', month: 'long', year: 'numeric' }

export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', DATE_OPTIONS) : '-'

/** Formats a DATEONLY (YYYY-MM-DD) without UTC timezone shift. */
export const formatDateOnly = (d) => {
  if (!d) return '-'
  const raw = String(d).slice(0, 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return formatDate(d)
  const [year, month, day] = raw.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-IN', DATE_OPTIONS)
}
