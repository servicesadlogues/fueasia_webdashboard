import { formatDate } from '../../../utils/formatDate'
import { EmptyState, ResponsiveRecordList } from '../../../components/ui'

const SPEAKER_COLUMNS = ['ID', 'Name', 'Organization', 'Designation', 'Nationality', 'Phone', 'Submitted']

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

const SpeakerTable = ({ speakers, onOpen }) => (
  <ResponsiveRecordList
    items={speakers}
    getKey={(row) => row.id}
    empty={(
      <EmptyState
        title="No speaker submissions"
        message="No speaker submissions yet."
      />
    )}
    columns={SPEAKER_COLUMNS}
    renderCard={(row) => <SpeakerCard row={row} onOpen={onOpen} />}
    renderRow={(row) => <SpeakerRow row={row} />}
    onActivate={(row) => onOpen(row.id)}
  />
)

export default SpeakerTable
