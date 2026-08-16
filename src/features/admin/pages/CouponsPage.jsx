import { useEffect, useState } from 'react'
import { notify } from '../../../utils/notify'
import PageHeader from '../../../components/ui/PageHeader'
import { createAdminCoupon, listAdminCoupons, updateAdminCoupon } from '../../../services/adminApi'
import { validateCouponForm } from '../../../utils/adminFormValidation'

const CouponsPage = () => {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({ code: '', discountPercent: '10', type: 'discount', description: '', isPublic: false })
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try {
      const res = await listAdminCoupons()
      setRows(res.coupons || [])
    } catch {
      /* interceptor toasts API errors */
    }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    const error = validateCouponForm(form)
    if (error) {
      notify.error(error)
      return
    }
    setSaving(true)
    try {
      await createAdminCoupon({
        ...form,
        code: form.code.trim().toUpperCase(),
        discountPercent: Number(form.discountPercent),
        isPublic: Boolean(form.isPublic) && Number(form.discountPercent) < 100,
      })
      notify.success('Coupon created.')
      setForm({ code: '', discountPercent: '10', type: 'discount', description: '', isPublic: false })
      load()
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Coupons"
        subtitle="Manage public discounts and hidden codes, including Sun Pharma-style coupons."
      />

      <div className="section-card">
        <div className="section-header">New coupon</div>
        <form className="section-body" onSubmit={handleCreate}>
          <div className="form-grid">
            <div>
              <label className="label">Code</label>
              <input className="input-field" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
            </div>
            <div>
              <label className="label">Discount %</label>
              <input className="input-field" type="number" min="0" max="100" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: e.target.value })} />
            </div>
            <div>
              <label className="label">Type</label>
              <select className="input-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="discount">Discount</option>
                <option value="sunpharma">Sun Pharma</option>
              </select>
            </div>
            <div>
              <label className="label">Description</label>
              <input className="input-field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <label className="mb-4 flex items-center gap-2 ds-body">
            <input type="checkbox" checked={form.isPublic} onChange={(e) => setForm({ ...form, isPublic: e.target.checked })} />
            Show on public registration form (100% codes stay hidden even if checked)
          </label>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Create coupon'}</button>
        </form>
      </div>

      <div className="section-card">
        <div className="section-header">All coupons</div>
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Public</th>
                <th>Active</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="font-semibold">{row.code}</td>
                  <td>{row.type}</td>
                  <td>{row.discountPercent}%</td>
                  <td>{row.isPublic ? 'Yes' : 'No'}</td>
                  <td>{row.isActive ? 'Yes' : 'No'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn-ghost !py-2"
                      onClick={() => updateAdminCoupon(row.id, { isActive: !row.isActive }).then(load).catch(() => {})}
                    >
                      {row.isActive ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CouponsPage
