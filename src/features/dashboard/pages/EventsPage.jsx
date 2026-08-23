import { Link } from 'react-router-dom'
import { EmptyState, PageHeader } from '../../../components/ui'
import { formatDate } from '../../../utils/formatDate'
import { useDashboard } from '../dashboardContext'

const EventsPage = () => {
  const { events } = useDashboard()

  return (
    <>
      <PageHeader
        title="Upcoming Events"
        subtitle="Browse event posters and register through the official link."
      />

      {!events.length ? (
        <EmptyState
          title="No upcoming events"
          message="Check back soon for new conferences and events."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/home/events/${event.id}`}
              className="ds-event-card group"
            >
              <div className="ds-event-card-media">
                {event.headerImageUrl ? (
                  <img src={event.headerImageUrl} alt="" className="ds-event-card-image" />
                ) : (
                  <div className="ds-event-card-placeholder" />
                )}
              </div>
              <div className="ds-event-card-body">
                <p className="font-semibold text-navy group-hover:text-[var(--color-primary)] transition-colors">
                  {event.title}
                </p>
                <p className="ds-caption mt-1">Posted {formatDate(event.createdAt)}</p>
                <p className="ds-muted mt-3 text-sm">Tap to view poster and register</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export default EventsPage
