const InfoGrid = ({ items }) => (
  <div className="ds-kv">
    {items.map((item) => (
      <div key={item.label} className="ds-kv-item">
        <p className="ds-kv-label">{item.label}</p>
        <p className="ds-kv-value">{item.value || '-'}</p>
      </div>
    ))}
  </div>
)

export default InfoGrid
