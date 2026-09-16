const Pagination = ({ page = 1, totalPages = 1, total = 0, pageSize = 10, onPage }) => {
  if (!total) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="ds-caption">
        Showing {from}–{to} of {total}
      </p>
      {totalPages > 1 ? (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="btn-ghost"
            disabled={page <= 1}
            aria-label="Previous page"
            onClick={() => onPage(page - 1)}
          >
            Previous
          </button>
          <span className="ds-caption whitespace-nowrap" aria-live="polite">Page {page} of {totalPages}</span>
          <button
            type="button"
            className="btn-ghost"
            disabled={page >= totalPages}
            aria-label="Next page"
            onClick={() => onPage(page + 1)}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default Pagination
