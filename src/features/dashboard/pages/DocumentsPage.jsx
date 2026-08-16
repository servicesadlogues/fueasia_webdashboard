import PageHeader from '../../../components/ui/PageHeader'
import { useDashboard } from '../dashboardContext'

const DocumentsPage = () => {
  const { documents } = useDashboard()
  const items = documents.items || []

  return (
    <div>
      <PageHeader
        title="Documents"
        subtitle="Files uploaded with your registration. Links expire after one hour — refresh the page if a link fails."
      />

      <div className="section-card">
        <div className="section-header">Submitted files</div>
        {items.length === 0 ? (
          <div className="ds-empty">
            <p>No documents are on file.</p>
            <p className="ds-caption mt-2">
              Photograph, medical certificate, and PG degree were optional at registration.
            </p>
          </div>
        ) : (
          <div className="section-body flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.key} className="ds-file-row">
                <div className="flex flex-1 items-center justify-between gap-4 px-4 py-3">
                  <div>
                    <p className="ds-label">{item.label}</p>
                    <p className="ds-caption">{item.fileName}</p>
                  </div>
                  <a className="btn-outline !py-2" href={item.url} target="_blank" rel="noreferrer">
                    Open
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentsPage
