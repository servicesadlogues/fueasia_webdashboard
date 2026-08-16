import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import { addAdminConferenceRegistration, getAdminConferenceRegistrations } from '../../../services/adminApi'
import { validateParticipantForm } from '../../../utils/adminFormValidation'
import PageHeader from '../../../components/ui/PageHeader'
import { formatDate } from '../../../utils/formatDate'
import { formatMoney } from '../../dashboard/utils/labels'
import { PaymentStatusBadge } from '../../dashboard/components/StatusBadge'

const empty = { name: '', email: '', membershipId: '', mobile: '', amountPaid: '0', paymentStatus: 'pending', notes: '' }

const ConferenceDetailPage = () => {
  const { id } = useParams()
  const [conference, setConference] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [form, setForm] = useState(empty)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await getAdminConferenceRegistrations(id)
      setConference(res.conference)
      setRegistrations(res.registrations || [])
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleAdd = async (e) => {
    e.preventDefault()
    const error = validateParticipantForm(form)
    if (error) {
      notify.error(error)
      return
    }
    setSaving(true)
    try {
      await addAdminConferenceRegistration(id, { ...form, amountPaid: Number(form.amountPaid || 0) })
      notify.success('Participant added.')
      setForm(empty)
      load()
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setSaving(false)
    }
  }

  if (loading) return null

  return (
    <div>
      <PageHeader
        kicker={<Link to="/admin/home/conferences" className="ds-link">Back to conferences</Link>}
        title={conference?.title}
        subtitle={`${conference?.location || '—'} · ${formatDate(conference?.startDate)}`}
      />

      <div className="section-card">
        <div className="section-header">Add participant</div>
        <form className="section-body" onSubmit={handleAdd}>
          <div className="form-grid">
            <div>
              <label className="label">Name</label>
              <input className="input-field" value={form.name} onChange={set('name')} required />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input-field" type="email" value={form.email} onChange={set('email')} required />
            </div>
            <div>
              <label className="label">Membership ID</label>
              <input className="input-field" value={form.membershipId} onChange={set('membershipId')} />
            </div>
            <div>
              <label className="label">Mobile</label>
              <input className="input-field" value={form.mobile} onChange={set('mobile')} />
            </div>
            <div>
              <label className="label">Amount paid</label>
              <input className="input-field" type="number" min="0" step="0.01" value={form.amountPaid} onChange={set('amountPaid')} />
            </div>
            <div>
              <label className="label">Payment status</label>
              <select className="input-field" value={form.paymentStatus} onChange={set('paymentStatus')}>
                <option value="pending">Pending</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          <label className="label">Notes</label>
          <input className="input-field mb-4" value={form.notes} onChange={set('notes')} />
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Add registration'}</button>
        </form>
      </div>

      <div className="section-card">
        <div className="section-header">{registrations.length} registrations</div>
        {!registrations.length ? (
          <div className="ds-empty">No registrations yet.</div>
        ) : (
          <div className="ds-table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Membership ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((row) => (
                  <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.membershipId || '—'}</td>
                    <td>{formatMoney(row.amountPaid, row.currency)}</td>
                    <td><PaymentStatusBadge status={row.paymentStatus} /></td>
                    <td>{formatDate(row.createdAt)}</td>
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

export default ConferenceDetailPage
