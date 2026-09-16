import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listAdminSpeakers } from '../../../services/adminApi'
import { isRequestCanceled } from '../../../services/httpFeedback'
import useDebouncedValue from '../../../hooks/useDebouncedValue'
import useRequestSequence from '../../../hooks/useRequestSequence'
import PageHeader from '../../../components/ui/PageHeader'
import Pagination from '../../../components/ui/Pagination'
import SpeakerTable from '../components/SpeakerTable'
import { ADMIN_LIST_PAGE_SIZE } from '../constants'

const SpeakerListPage = () => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [data, setData] = useState({ speakers: [], total: 0, totalPages: 1, page: 1 })
  const [loading, setLoading] = useState(true)
  const request = useRequestSequence()
  const search = useDebouncedValue(searchInput, 350)

  useEffect(() => {
    setPage(1)
  }, [search])

  useEffect(() => {
    const id = request.next()
    const controller = new AbortController()
    setLoading(true)

    listAdminSpeakers(
      { search, page, limit: ADMIN_LIST_PAGE_SIZE },
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
  }, [search, page])

  return (
    <div>
      <PageHeader
        title="Speakers"
        subtitle="Review speaker submissions from the public speaker registration form."
      />
      <div className="section-card">
        <div className="section-header">{data.total} records</div>
        <div className="section-body">
          <div className="mb-5">
            <label className="label">Search</label>
            <input
              className="input-field"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className={loading && data.speakers.length ? 'opacity-70' : ''}>
            <SpeakerTable
              speakers={data.speakers}
              onOpen={(id) => navigate(`/admin/home/speakers/${id}`)}
            />
          </div>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            total={data.total}
            pageSize={ADMIN_LIST_PAGE_SIZE}
            onPage={setPage}
          />
        </div>
      </div>
    </div>
  )
}

export default SpeakerListPage
