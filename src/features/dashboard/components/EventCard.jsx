import { Link } from 'react-router-dom'
import { EVENT_CARD_THUMBNAIL_URL } from '../../../constants/brand'
import EventMeta from './EventMeta'

const EventCard = ({ event }) => (
  <Link
    to={`/home/events/${event.id}`}
    className="ds-event-card"
    aria-label={event.title ? `View ${event.title}` : 'View event'}
  >
    <div className="ds-event-card-media">
      <img
        src={EVENT_CARD_THUMBNAIL_URL}
        alt=""
        className="ds-event-card-image"
      />
    </div>
    <div className="ds-event-card-footer">
      <EventMeta event={event} />
    </div>
  </Link>
)

export default EventCard
