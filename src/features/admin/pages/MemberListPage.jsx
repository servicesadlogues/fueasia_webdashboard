import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { exportAdminMembers, listAdminMembers } from '../../../services/adminApi'
import { isRequestCanceled } from '../../../services/httpFeedback'
import { downloadBlob } from '../../../utils/download'
import useDebouncedValue from '../../../hooks/useDebouncedValue'
import useRequestSequence from '../../../hooks/useRequestSequence'
import PageHeader from '../../../components/ui/PageHeader'
import Pagination from '../../../components/ui/Pagination'
import MemberFilters from '../components/MemberFilters'
import MemberTable from '../components/MemberTable'
import { MEMBER_PAGE_SIZE } from '../constants'

const emptyFilters = { memberType: '', paymentStatus: '', speciality: '', page: 1 }

const MemberListPage = ({
  title,
  subtitle,
  group,
  showType = true,
  exportName = 'fue-global-members.csv',
}) => {
  const navigate = useNavigate()
  const [searchInput, setSearchInput] = useState('')
  const [filters, setFilters] = useState(emptyFilters)
  const [data, setData] = useState({ members: [], total: 0, totalPages: 1, page: 1 })
  const [loading, setLoading] = useState(true)
  const request = useRequestSequence()
  const search = useDebouncedValue(searchInput, 350)

  useEffect(() => {
    setFilters((current) => (current.page === 1 ? current : { ...current, page: 1 }))
  }, [search])

  useEffect(() => {
    const id = request.next()
    const controller = new AbortController()
    setLoading(true)

    listAdminMembers(
      { ...filters, search, group, limit: MEMBER_PAGE_SIZE },
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
  }, [filters, search, group])

  const handleExport = async () => {
    try {
      const csv = await exportAdminMembers({ ...filters, search, group })
      downloadBlob(csv, exportName, 'text/csv;charset=utf-8;')
    } catch {
      /* interceptor toasts API errors */
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={<button type="button" className="btn-outline" onClick={handleExport}>Export CSV</button>}
      />
      <div className="section-card">
        <div className="section-header">{data.total} records</div>
        <div className="section-body">
          <MemberFilters
            value={filters}
            onChange={setFilters}
            search={searchInput}
            onSearchChange={setSearchInput}
            showType={showType}
          />
          <div className={loading ? 'opacity-70 pointer-events-none' : ''}>
            {loading && !data.members.length ? (
              <div className="ds-page-loader-slot" aria-hidden="true" />
            ) : (
              <MemberTable members={data.members} onOpen={(id) => navigate(`/admin/home/members/${id}`)} />
            )}
          </div>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            total={data.total}
            pageSize={MEMBER_PAGE_SIZE}
            onPage={(page) => setFilters((current) => ({ ...current, page }))}
          />
        </div>
      </div>
    </div>
  )
}

export default MemberListPage
