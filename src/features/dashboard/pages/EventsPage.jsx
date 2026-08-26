import { EmptyState, PageHeader } from '../../../components/ui'
import { useDashboard } from '../dashboardContext'
import EventCard from '../components/EventCard'

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
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </>
  )
}

export default EventsPage
