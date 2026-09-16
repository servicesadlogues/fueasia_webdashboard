export const onActivateKeyDown = (onActivate) => (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    onActivate()
  }
}

const InteractiveTableRow = ({ onActivate, children, className = '', ...props }) => (
  <tr
    className={`ds-table-row-interactive ${className}`.trim()}
    tabIndex={0}
    onClick={onActivate}
    onKeyDown={onActivateKeyDown(onActivate)}
    {...props}
  >
    {children}
  </tr>
)

export default InteractiveTableRow
