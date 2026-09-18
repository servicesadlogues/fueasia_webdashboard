import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '../../../components/ui'
import { getMemberEvent } from '../../../services/api'
import { isInternalPath } from '../../../utils/urls'
import { useDashboard } from '../dashboardContext'
import EventMeta from '../components/EventMeta'

const EventDetailPage = () => {
  const { id } = useParams()
  const { events } = useDashboard()
  const cachedEvent = events.find((item) => String(item.id) === String(id))
  const [event, setEvent] = useState(cachedEvent || null)
  const [loading, setLoading] = useState(!cachedEvent)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (cachedEvent) {
      setEvent(cachedEvent)
      setLoading(false)
      setNotFound(false)
      return undefined
    }

    let cancelled = false
    setLoading(true)
    setNotFound(false)
    getMemberEvent(id)
      .then((res) => {
        if (!cancelled) setEvent(res.event || null)
      })
      .catch(() => {
        if (!cancelled) {
          setEvent(null)
          setNotFound(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [cachedEvent, id])

  const registrationLink = event?.registrationLink || ''

  return (
    <div className="ds-event-detail">
      <div className="ds-event-detail-toolbar">
        <Link to="/home/events" className="btn-ghost">Back to events</Link>
      </div>

      {loading ? (
        <div className="ds-page-loader-slot" aria-hidden="true" />
      ) : notFound || !event ? (
        <EmptyState
          title="Event unavailable"
          message="This event is no longer available."
          action={<Link to="/home/events" className="btn-primary mt-4 inline-flex">Back to events</Link>}
        />
      ) : (
        <>
          <div className="ds-event-poster ds-event-poster-full">
            {event.headerImageUrl ? (
              <img src={event.headerImageUrl} alt="" className="ds-event-poster-image" />
            ) : null}
            {event.bodyImageUrl ? (
              <img src={event.bodyImageUrl} alt="" className="ds-event-poster-image" />
            ) : null}
          </div>

          <div className="ds-event-detail-meta">
            <EventMeta event={event} layout="row" />
          </div>

          {registrationLink ? (
            <div className="ds-event-detail-cta">
              <p className="ds-muted text-sm">Ready to register for this event?</p>
              {isInternalPath(registrationLink) ? (
                <Link to={registrationLink} className="btn-primary min-w-[12rem]">
                  Register now
                </Link>
              ) : (
                <a
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary min-w-[12rem]"
                >
                  Register now
                </a>
              )}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default EventDetailPage
