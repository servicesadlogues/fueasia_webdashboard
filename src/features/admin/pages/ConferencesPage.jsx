import { useEffect, useState } from 'react'
import { notify } from '../../../utils/notify'
import {
  createAdminConference,
  deleteAdminConference,
  listAdminConferences,
  updateAdminConference,
} from '../../../services/adminApi'
import { validateConferenceForm } from '../../../utils/adminFormValidation'
import PageHeader from '../../../components/ui/PageHeader'
import ConfirmDialog from '../../../components/ui/ConfirmDialog'
import { formatDate } from '../../../utils/formatDate'

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
        subtitle="Upload event posters and share a registration link with members."
      />

      <div className="section-card">
        <div className="section-header">New conference</div>
        <form className="section-body" onSubmit={handleCreate}>
          <p className="ds-muted mb-4 text-sm leading-relaxed">
            Upload a header image and a body image. Members will see them stacked as one poster with no gap between the two.
          </p>
          <div className="form-grid form-grid-last">
            <div className="md:col-span-2">
              <label className="label">Header image — top section (JPG or PNG)</label>
              <input
                className="block"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setForm((f) => ({ ...f, headerImage: e.target.files?.[0] || null }))}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Body image — bottom section (JPG or PNG)</label>
              <input
                className="block"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setForm((f) => ({ ...f, bodyImage: e.target.files?.[0] || null }))}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="label">Registration link</label>
            <input
              className="input-field"
              value={form.registrationLink}
              onChange={(e) => setForm((f) => ({ ...f, registrationLink: e.target.value }))}
              placeholder="https://member.fueasia.org/ or /"
              required
            />
            <p className="ds-caption mt-2">Use a full URL or a site path like / for the membership registration page.</p>
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
                  <th>Poster</th>
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
                    <td className="max-w-[12rem] truncate">{row.registrationLink || '—'}</td>
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
