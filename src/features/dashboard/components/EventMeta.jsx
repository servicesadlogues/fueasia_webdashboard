import { CalendarDays, MapPin, Tag } from 'lucide-react'
import { formatDateOnly } from '../../../utils/formatDate'

const iconProps = { size: 16, strokeWidth: 2, 'aria-hidden': true }

const EventMeta = ({ event, layout = 'stack', className = '' }) => {
  const rows = [
    { icon: Tag, label: 'Name', value: event.title },
    { icon: CalendarDays, label: 'Date', value: formatDateOnly(event.startDate) },
    { icon: MapPin, label: 'Venue', value: event.location },
  ]

  const layoutClass = layout === 'row' ? 'ds-event-meta--row' : ''

  return (
    <dl className={`ds-event-meta ${layoutClass} ${className}`.trim()}>
      {rows.map((row) => {
        const Icon = row.icon
        return (
          <div key={row.label} className="ds-event-meta-row">
            <Icon className="ds-event-meta-icon" {...iconProps} />
            <div className="min-w-0">
              <dt className="ds-event-meta-label">{row.label}</dt>
              <dd className={`ds-event-meta-value${row.label === 'Name' ? ' ds-event-meta-name' : ''}`}>
                {row.value || '-'}
              </dd>
            </div>
          </div>
        )
      })}
    </dl>
  )
}

export default EventMeta
