import { formatDate } from '../../../utils/formatDate'

const SpeakerRow = ({ row }) => (
  <>
    <td className="font-semibold text-navy">#{row.id}</td>
    <td>
      <p className="font-medium">{row.fullName || row.preferredName || '—'}</p>
      <p className="ds-caption">{row.contactEmail || '—'}</p>
    </td>
    <td>{row.organization || '—'}</td>
    <td>{row.designation || '—'}</td>
    <td>{row.nationality || '—'}</td>
    <td>{row.contactPhone || '—'}</td>
    <td>{formatDate(row.createdAt)}</td>
  </>
)

const SpeakerCard = ({ row, onOpen }) => (
  <button
    type="button"
    className="ds-list-card"
    onClick={() => onOpen(row.id)}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-semibold text-navy truncate">{row.fullName || row.preferredName || 'Speaker'}</p>
        <p className="ds-caption truncate">#{row.id}</p>
        <p className="ds-caption truncate">{row.contactEmail || '—'}</p>
      </div>
    </div>
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="ds-caption">{row.organization || '—'}</span>
      <span className="ds-caption">{row.nationality || '—'}</span>
    </div>
    <p className="ds-caption mt-2">Submitted {formatDate(row.createdAt)}</p>
  </button>
)

const SpeakerTable = ({ speakers, onOpen }) => {
  if (!speakers?.length) {
    return <div className="ds-empty">No speaker submissions yet.</div>
  }

  return (
    <>
      <div className="space-y-3 md:hidden">
        {speakers.map((row) => (
          <SpeakerCard key={row.id} row={row} onOpen={onOpen} />
        ))}
      </div>
      <div className="ds-table-wrap hidden md:block">
        <table className="ds-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Organization</th>
              <th>Designation</th>
              <th>Nationality</th>
              <th>Phone</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {speakers.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer hover:bg-page"
                onClick={() => onOpen(row.id)}
              >
                <SpeakerRow row={row} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default SpeakerTable
