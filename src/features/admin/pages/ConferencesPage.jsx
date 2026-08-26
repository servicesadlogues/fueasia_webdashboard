import { useEffect, useState } from 'react'
import { notify } from '../../../utils/notify'
import {
  createAdminConference,
  deleteAdminConference,
  listAdminConferences,
  updateAdminConference,
} from '../../../services/adminApi'
import { validateConferenceForm } from '../../../utils/adminFormValidation'
import { ConfirmDialog, ImageUploadField, PageHeader } from '../../../components/ui'
import { formatDate, formatDateOnly } from '../../../utils/formatDate'

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const emptyForm = {
  title: '',
  startDate: '',
  location: '',
  registrationLink: '',
  headerImage: null,
  bodyImage: null,
}

const ConferencesPage = () => {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await listAdminConferences()
      setRows(res.conferences || [])
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    const error = validateConferenceForm(form)
    if (error) {
      notify.error(error)
      return
    }
    const formData = new FormData()
    formData.append('title', form.title.trim())
    formData.append('startDate', form.startDate)
    formData.append('location', form.location.trim())
    formData.append('registrationLink', form.registrationLink.trim())
    formData.append('headerImage', form.headerImage)
    formData.append('bodyImage', form.bodyImage)
    setSaving(true)
    try {
      await createAdminConference(formData)
      notify.success('Conference created.')
      setForm(emptyForm)
      e.target.reset()
      load()
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (row) => {
    try {
      await updateAdminConference(row.id, { isActive: !row.isActive })
      load()
    } catch {
      /* interceptor toasts API errors */
    }
  }

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      await deleteAdminConference(pendingDelete.id)
      notify.success('Conference deleted.')
      setPendingDelete(null)
      load()
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Conferences"
        subtitle="Add event details, posters, and a registration link for members."
      />

      <div className="section-card">
        <div className="section-header">New conference</div>
        <form className="section-body" onSubmit={handleCreate}>
          <p className="ds-muted mb-4 text-sm leading-relaxed">
            Name, date, and venue are required. Upload a header image and a body image - members see them stacked as one poster.
          </p>
          <div className="form-grid">
            <div className="md:col-span-2">
              <label className="label">Event name <span className="required">*</span></label>
              <input
                className="input-field"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="FUE Asia Annual Meeting"
                maxLength={200}
                required
              />
            </div>
            <div>
              <label className="label">Date <span className="required">*</span></label>
              <input
                className="input-field"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="label">Venue <span className="required">*</span></label>
              <input
                className="input-field"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="City, venue, or hotel"
                maxLength={200}
                required
              />
            </div>
            <div>
              <ImageUploadField
                label="Header image - top section"
                required
                hint="JPG or PNG · max 5MB"
                value={form.headerImage}
                onChange={(file) => setForm((f) => ({ ...f, headerImage: file }))}
              />
            </div>
            <div>
              <ImageUploadField
                label="Body image - bottom section"
                required
                hint="JPG or PNG · max 5MB"
                value={form.bodyImage}
                onChange={(file) => setForm((f) => ({ ...f, bodyImage: file }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Registration link <span className="required">*</span></label>
              <input
                className="input-field"
                value={form.registrationLink}
                onChange={(e) => setForm((f) => ({ ...f, registrationLink: e.target.value }))}
                placeholder="https://member.fueasia.org/ or /"
                required
              />
              <p className="ds-caption mt-2">Use a full URL or a site path like / for the membership registration page.</p>
            </div>
          </div>
          <button type="submit" className="btn-primary mt-4" disabled={saving}>
            {saving ? 'Creating...' : 'Create conference'}
          </button>
        </form>
      </div>

      <div className="section-card">
        <div className="section-header">All conferences</div>
        {loading ? null : !rows.length ? (
          <div className="ds-empty">No conferences yet.</div>
        ) : (
          <div className="ds-table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Registration link</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {row.headerImageUrl ? (
                          <img
                            src={row.headerImageUrl}
                            alt=""
                            className="h-14 w-10 rounded object-cover border border-[var(--color-border)]"
                          />
                        ) : (
                          <div className="h-14 w-10 rounded bg-[var(--color-page)] border border-[var(--color-border)]" />
                        )}
                        <div>
                          <p className="font-medium">{row.title}</p>
                          <p className="ds-caption">{row.headerImageUrl && row.bodyImageUrl ? 'Poster ready' : 'Missing images'}</p>
                        </div>
                      </div>
                    </td>
                    <td>{formatDateOnly(row.startDate)}</td>
                    <td className="max-w-[12rem]">{row.location || '-'}</td>
                    <td className="max-w-[12rem] truncate">{row.registrationLink || '-'}</td>
                    <td>{formatDate(row.createdAt)}</td>
                    <td>{row.isActive ? 'Active' : 'Hidden'}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button type="button" className="btn-ghost !py-2" onClick={() => toggleActive(row)}>
                          {row.isActive ? 'Hide' : 'Show'}
                        </button>
                        <button
                          type="button"
                          className="ds-icon-btn text-[var(--color-danger)]"
                          onClick={() => setPendingDelete(row)}
                          aria-label={`Delete ${row.title}`}
                          title="Delete conference"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this conference?"
        message="This action cannot be undone. The conference and its poster images will be permanently removed."
        detail={pendingDelete ? { title: pendingDelete.title } : null}
        confirmLabel="Yes, delete"
        cancelLabel="Keep conference"
        busy={deleting}
        busyLabel="Deleting..."
        onCancel={() => !deleting && setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default ConferencesPage
