import { useEffect, useState } from 'react'
import { notify } from '../../../utils/notify'
import PageHeader from '../../../components/ui/PageHeader'
import { createAdminCms, deleteAdminCms, listAdminCms, updateAdminCms } from '../../../services/adminApi'
import { validateCmsForm } from '../../../utils/adminFormValidation'

const ContentPage = () => {
  const [kind, setKind] = useState('banner')
  const [assets, setAssets] = useState([])
  const [title, setTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async (nextKind = kind) => {
    setLoading(true)
    try {
      const res = await listAdminCms(nextKind)
      setAssets(res.assets || [])
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(kind) }, [kind])

  const handleCreate = async (e) => {
    e.preventDefault()
    const error = validateCmsForm({ title, linkUrl, file })
    if (error) {
      notify.error(error)
      return
    }
    const formData = new FormData()
    formData.append('kind', kind)
    formData.append('title', title)
    formData.append('linkUrl', linkUrl)
    formData.append('image', file)
    setSaving(true)
    try {
      await createAdminCms(formData)
      notify.success('Asset uploaded.')
      setTitle('')
      setLinkUrl('')
      setFile(null)
      e.target.reset()
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
        title="Content"
        subtitle="Upload banners, creatives, and homepage visuals."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {['banner', 'creative', 'homepage'].map((item) => (
          <button
            key={item}
            type="button"
            className={kind === item ? 'btn-primary' : 'btn-ghost'}
            onClick={() => setKind(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="section-card">
        <div className="section-header">Upload {kind}</div>
        <form className="section-body" onSubmit={handleCreate}>
          <div className="form-grid">
            <div>
              <label className="label">Title</label>
              <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="label">Link URL (optional)</label>
              <input className="input-field" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
            </div>
          </div>
          <label className="label">Image (JPG or PNG)</label>
          <input className="mb-4 block" type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Uploading...' : 'Upload'}</button>
        </form>
      </div>

      <div className="section-card">
        <div className="section-header">Library</div>
        {loading ? null : !assets.length ? (
          <div className="ds-empty">No {kind} assets yet.</div>
        ) : (
          <div className="section-body grid gap-4 md:grid-cols-3">
            {assets.map((asset) => (
              <div key={asset.id} className="overflow-hidden rounded-lg border border-[var(--color-border)]">
                {asset.imageUrl ? (
                  <img src={asset.imageUrl} alt={asset.altText || asset.title} className="h-36 w-full object-cover" />
                ) : null}
                <div className="p-3">
                  <p className="font-semibold">{asset.title}</p>
                  <p className="ds-caption mb-2">{asset.isActive ? 'Visible' : 'Hidden'}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn-ghost !py-2"
                      onClick={() => updateAdminCms(asset.id, { isActive: !asset.isActive }).then(load).catch(() => {})}
                    >
                      {asset.isActive ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      className="btn-danger !py-2"
                      onClick={() => deleteAdminCms(asset.id).then(() => { notify.success('Deleted.'); load() }).catch(() => {})}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentPage
