import { Trash2 } from 'lucide-react'
import { formatDate } from '../../../utils/formatDate'
import { EmptyState, ResponsiveRecordList } from '../../../components/ui'

const SPEAKER_COLUMNS = ['Speaker ID', 'Name', 'Organization', 'Designation', 'Nationality', 'Phone', 'Submitted', '']

const SpeakerRow = ({ row, onDelete }) => (
  <>
    <td className="font-semibold text-navy">{row.speakerId || `#${row.id}`}</td>
    <td>
      <p className="font-medium">{row.fullName || row.preferredName || '—'}</p>
      <p className="ds-caption">{row.contactEmail || '—'}</p>
    </td>
    <td>{row.organization || '—'}</td>
    <td>{row.designation || '—'}</td>
    <td>{row.nationality || '—'}</td>
    <td>{row.contactPhone || '—'}</td>
    <td>{formatDate(row.createdAt)}</td>
    <td>
      <button
        type="button"
        className="ds-icon-btn-danger"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(row)
        }}
        aria-label={`Delete ${row.fullName || row.speakerId || 'speaker'}`}
        title="Delete speaker"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </td>
  </>
)

const SpeakerCard = ({ row, onOpen, onDelete }) => (
  <div className="ds-list-card">
    <button type="button" className="w-full text-left" onClick={() => onOpen(row.id)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-navy truncate">{row.fullName || row.preferredName || 'Speaker'}</p>
          <p className="ds-caption truncate">{row.speakerId || `#${row.id}`}</p>
          <p className="ds-caption truncate">{row.contactEmail || '—'}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="ds-caption">{row.organization || '—'}</span>
        <span className="ds-caption">{row.nationality || '—'}</span>
      </div>
      <p className="ds-caption mt-2">Submitted {formatDate(row.createdAt)}</p>
    </button>
    <div className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
      <button
        type="button"
        className="btn-danger !min-h-0 !py-2 !px-3"
        onClick={() => onDelete(row)}
      >
        Delete
      </button>
    </div>
  </div>
)

const SpeakerTable = ({ speakers, onOpen, onDelete }) => (
  <ResponsiveRecordList
    items={speakers}
    getKey={(row) => row.id}
    empty={(
      <EmptyState
        title="No speaker submissions"
        message="No speakers match these filters."
      />
    )}
    columns={SPEAKER_COLUMNS}
    renderCard={(row) => <SpeakerCard row={row} onOpen={onOpen} onDelete={onDelete} />}
    renderRow={(row) => <SpeakerRow row={row} onDelete={onDelete} />}
    onActivate={(row) => onOpen(row.id)}
  />
)

export default SpeakerTable
