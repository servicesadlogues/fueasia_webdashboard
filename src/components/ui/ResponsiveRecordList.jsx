import InteractiveTableRow from './InteractiveTableRow'

const ResponsiveRecordList = ({
  items,
  getKey,
  empty,
  renderCard,
  columns,
  renderRow,
  onActivate,
}) => {
  if (!items?.length) return empty

  return (
    <>
      <div className="space-y-3 md:hidden">
        {items.map((row) => (
          <div key={getKey(row)}>{renderCard(row)}</div>
        ))}
      </div>
      <div className="ds-table-wrap hidden md:block">
        <table className="ds-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <InteractiveTableRow
                key={getKey(row)}
                onActivate={onActivate ? () => onActivate(row) : undefined}
              >
                {renderRow(row)}
              </InteractiveTableRow>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ResponsiveRecordList
