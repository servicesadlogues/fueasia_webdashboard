const RouteFallback = () => (
  <div
    className="flex min-h-[40vh] flex-col items-center justify-center py-16"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <div className="spinner" style={{ width: '2.5rem', height: '2.5rem', borderWidth: '3px' }} />
  </div>
)

export default RouteFallback
