import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAdminSpeaker, getAdminSpeakerDocuments } from '../../../services/adminApi'
import { formatDate } from '../../../utils/formatDate'
import { resolvePreviewMimeType } from '../../../utils/fileUpload'
import { DocumentPreviewModal, PageHeader } from '../../../components/ui'
import InfoGrid from '../../../components/ui/InfoGrid'
import { displayValue } from '../../../utils/labels'

const boolLabel = (value) => (value ? 'Yes' : 'No')

const SPEAKER_DOC_ORDER = ['photo', 'passport', 'cv']

const sortSpeakerDocuments = (items = []) =>
  [...items].sort(
    (a, b) => SPEAKER_DOC_ORDER.indexOf(a.key) - SPEAKER_DOC_ORDER.indexOf(b.key),
  )

const SpeakerDetailPage = () => {
  const { id } = useParams()
  const [speaker, setSpeaker] = useState(null)
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState({ open: false, title: '', url: '', mimeType: '' })

  useEffect(() => {
    let active = true
    setLoading(true)

    Promise.all([
      getAdminSpeaker(id),
      getAdminSpeakerDocuments(id).catch(() => ({ documents: { items: [] } })),
    ])
      .then(([speakerRes, docsRes]) => {
        if (!active) return
        setSpeaker(speakerRes.speaker)
        setDocuments(sortSpeakerDocuments(docsRes.documents?.items || []))
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => { active = false }
  }, [id])

  if (loading) return null
  if (!speaker) {
    return <p className="ds-muted">Speaker not found. <Link to="/admin/home/speakers" className="ds-link">Back</Link></p>
  }

  const displayName = speaker.fullName || speaker.preferredName || `Speaker #${speaker.id}`

  const openDocumentPreview = (item) => {
    setPreview({
      open: true,
      title: item.label,
      url: item.url,
      mimeType: resolvePreviewMimeType(item.mimeType, item.fileName),
    })
  }

  return (
    <div>
      <PageHeader
        kicker={<Link to="/admin/home/speakers" className="ds-link">Back to speakers</Link>}
        title={displayName}
        subtitle={`Submission #${speaker.id}`}
      />

      <div className="section-card">
        <div className="section-header">Personal Information</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Full name', value: displayValue(speaker.fullName) },
              { label: 'Preferred name', value: displayValue(speaker.preferredName) },
              { label: 'Title', value: displayValue(speaker.title) },
              { label: 'Designation', value: displayValue(speaker.designation) },
              { label: 'Organization', value: displayValue(speaker.organization) },
              { label: 'Nationality', value: displayValue(speaker.nationality) },
              { label: 'Foreign resident', value: displayValue(speaker.uaeResident) },
              { label: 'Contact email', value: displayValue(speaker.contactEmail) },
              { label: 'Contact phone', value: displayValue(speaker.contactPhone) },
              { label: 'Instagram', value: displayValue(speaker.instagram) },
              { label: 'Facebook', value: displayValue(speaker.facebook) },
              { label: 'LinkedIn', value: displayValue(speaker.linkedin) },
              { label: 'YouTube', value: displayValue(speaker.youtube) },
              { label: 'X (Twitter)', value: displayValue(speaker.twitter) },
              { label: 'Submitted on', value: formatDate(speaker.createdAt) },
            ]}
          />
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">Short Bio</div>
        <div className="section-body">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{speaker.shortBio || '—'}</p>
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">Suggested Topics</div>
        {(!speaker.topics || speaker.topics.length === 0) ? (
          <div className="ds-empty">No topics submitted.</div>
        ) : (
          <div className="section-body space-y-6">
            {speaker.topics.map((topic, index) => (
              <div key={`${topic.topic}-${index}`} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-navy mb-2">Topic {index + 1}</p>
                <InfoGrid
                  items={[
                    { label: 'Topic', value: displayValue(topic.topic) },
                    { label: 'Abstract', value: displayValue(topic.abstract) },
                    { label: 'Lecture', value: boolLabel(topic.sessionLecture) },
                    { label: 'Workshop', value: boolLabel(topic.sessionWorkshop) },
                  ]}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section-card">
        <div className="section-header">Agreements</div>
        <div className="section-body">
          <InfoGrid
            items={[
              { label: 'Scientific/non-commercial confirmation', value: boolLabel(speaker.agreementScientific) },
              { label: 'Photo & bio consent', value: boolLabel(speaker.agreementPhotoBio) },
              { label: 'Final presentation agreement', value: boolLabel(speaker.agreementPresentation) },
              { label: 'Data storage consent', value: boolLabel(speaker.agreementDataStorage) },
              { label: 'Profile complete confirmed', value: boolLabel(speaker.profileCompleteConfirmed) },
            ]}
          />
        </div>
      </div>

      <div className="section-card">
        <div className="section-header">Documents</div>
        {documents.length === 0 ? (
          <div className="ds-empty">No documents on file.</div>
        ) : (
          <div className="section-body flex flex-col gap-3">
            {documents.map((item) => (
              <div key={item.key} className="ds-file-row">
                <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
                  <div>
                    <p className="ds-label">{item.label}</p>
                    <p className="ds-caption">{item.fileName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="btn-outline !py-2"
                      onClick={() => openDocumentPreview(item)}
                    >
                      Preview
                    </button>
                    <a className="btn-outline !py-2" href={item.url} target="_blank" rel="noreferrer">Open</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DocumentPreviewModal
        open={preview.open}
        title={preview.title}
        url={preview.url}
        mimeType={preview.mimeType}
        onClose={() => setPreview({ open: false, title: '', url: '', mimeType: '' })}
      />
    </div>
  )
}

export default SpeakerDetailPage
