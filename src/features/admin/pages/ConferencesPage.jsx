import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import { createAdminConference, listAdminConferences, updateAdminConference } from '../../../services/adminApi'
import { validateConferenceForm } from '../../../utils/adminFormValidation'
import PageHeader from '../../../components/ui/PageHeader'
import { formatDate } from '../../../utils/formatDate'
import { formatMoney } from '../../dashboard/utils/labels'

const emptyForm = {
  title: '',
  location: '',
  startDate: '',
  endDate: '',
  fee: '0',
  currency: 'USD',
  description: '',
}

const ConferencesPage = () => {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleCreate = async (e) => {
    e.preventDefault()
    const error = validateConferenceForm(form)
    if (error) {
      notify.error(error)
      return
    }
    setSaving(true)
    try {
      await createAdminConference({ ...form, fee: Number(form.fee || 0) })
      notify.success('Conference created.')
      setForm(emptyForm)
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

  return (
    <div>
      <PageHeader
        title="Conferences"
        subtitle="Create events, track participants, and open registration lists."
      />

      <div className="section-card">
        <div className="section-header">New conference</div>
        <form className="section-body" onSubmit={handleCreate}>
          <div className="form-grid">
            <div>
              <label className="label">Title</label>
              <input className="input-field" value={form.title} onChange={set('title')} required />
            </div>
            <div>
              <label className="label">Location</label>
              <input className="input-field" value={form.location} onChange={set('location')} />
            </div>
            <div>
              <label className="label">Start date</label>
              <input className="input-field" type="date" value={form.startDate} onChange={set('startDate')} />
            </div>
            <div>
              <label className="label">End date</label>
              <input className="input-field" type="date" value={form.endDate} onChange={set('endDate')} />
            </div>
            <div>
              <label className="label">Fee</label>
              <input className="input-field" type="number" min="0" step="0.01" value={form.fee} onChange={set('fee')} />
            </div>
            <div>
              <label className="label">Currency</label>
              <select className="input-field" value={form.currency} onChange={set('currency')}>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>
          <label className="label">Description</label>
          <textarea className="input-field mb-4 h-24" value={form.description} onChange={set('description')} />
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Create conference'}</button>
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
                  <th>Title</th>
                  <th>Dates</th>
                  <th>Fee</th>
                  <th>Participants</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <p className="font-medium">{row.title}</p>
                      <p className="ds-caption">{row.location || '—'}</p>
                    </td>
                    <td>{formatDate(row.startDate)} — {formatDate(row.endDate)}</td>
                    <td>{formatMoney(row.fee, row.currency)}</td>
                    <td>{row.participants}</td>
                    <td>{row.isActive ? 'Active' : 'Hidden'}</td>
                    <td className="flex gap-2">
                      <button type="button" className="btn-outline !py-2" onClick={() => navigate(`/admin/home/conferences/${row.id}`)}>Registrations</button>
                      <button type="button" className="btn-ghost !py-2" onClick={() => toggleActive(row)}>
                        {row.isActive ? 'Hide' : 'Show'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConferencesPage
