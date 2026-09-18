import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../../utils/notify'
import { deleteAdminSpeaker, exportAdminSpeakers, listAdminSpeakers } from '../../../services/adminApi'
import { isRequestCanceled } from '../../../services/httpFeedback'
import { downloadBlob } from '../../../utils/download'
import useDebouncedValue from '../../../hooks/useDebouncedValue'
import useRequestSequence from '../../../hooks/useRequestSequence'
import { ConfirmDialog, PageHeader } from '../../../components/ui'
import Pagination from '../../../components/ui/Pagination'
import SpeakerFilters from '../components/SpeakerFilters'
import SpeakerTable from '../components/SpeakerTable'
import { ADMIN_LIST_PAGE_SIZE } from '../constants'

const emptyFilters = {
  year: '',
  uaeResident: '',
  nationality: '',
  page: 1,
}

const SpeakerListPage = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [filters, setFilters] = useState(emptyFilters)
  const [data, setData] = useState({ speakers: [], total: 0, totalPages: 1, page: 1 })
  const [loading, setLoading] = useState(true)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const request = useRequestSequence()
  const search = useDebouncedValue(searchInput, 350)

  useEffect(() => {
    setFilters((current) => (current.page === 1 ? current : { ...current, page: 1 }))
  }, [search])

  useEffect(() => {
    const id = request.next()
    const controller = new AbortController()
    setLoading(true)

    listAdminSpeakers(
      {
        ...filters,
        search,
        page: filters.page,
        limit: ADMIN_LIST_PAGE_SIZE,
      },
      { signal: controller.signal },
    )
      .then((res) => {
        if (!request.isLatest(id)) return
        setData(res)
      })
      .catch((err) => {
        if (isRequestCanceled(err)) return
      })
      .finally(() => {
        if (request.isLatest(id)) setLoading(false)
      })

    return () => controller.abort()
  }, [filters, search])

  const handleExport = async () => {
    try {
      const csv = await exportAdminSpeakers({ ...filters, search })
      downloadBlob(csv, 'fue-global-speakers.csv', 'text/csv;charset=utf-8;')
    } catch {
      /* interceptor toasts API errors */
    }
  }

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      await deleteAdminSpeaker(pendingDelete.id)
      notify.success('Speaker deleted.')
      setPendingDelete(null)
      setFilters((current) => ({ ...current }))
    } catch {
      /* interceptor toasts API errors */
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Speakers"
        subtitle="Review speaker submissions from the public speaker registration form."
        actions={<button type="button" className="btn-outline" onClick={handleExport}>Export CSV</button>}
      />
      <div className="section-card">
        <div className="section-header">{data.total} records</div>
        <div className="section-body">
          <SpeakerFilters
            value={filters}
            onChange={setFilters}
            search={searchInput}
            onSearchChange={setSearchInput}
          />
          <div className={loading ? 'opacity-70 pointer-events-none' : ''}>
            {loading && !data.speakers.length ? (
              <div className="ds-page-loader-slot" aria-hidden="true" />
            ) : (
              <SpeakerTable
                speakers={data.speakers}
                onOpen={(id) => navigate(`/admin/home/speakers/${id}`)}
                onDelete={setPendingDelete}
              />
            )}
          </div>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            total={data.total}
            pageSize={ADMIN_LIST_PAGE_SIZE}
            onPage={(page) => setFilters((current) => ({ ...current, page }))}
          />
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this speaker?"
        message="This action cannot be undone. The speaker record and all uploaded documents will be permanently removed."
        detail={pendingDelete ? {
          title: pendingDelete.speakerId || pendingDelete.fullName || `Speaker #${pendingDelete.id}`,
        } : null}
        confirmLabel="Yes, delete"
        cancelLabel="Keep speaker"
        busy={deleting}
        busyLabel="Deleting..."
        onCancel={() => !deleting && setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default SpeakerListPage
