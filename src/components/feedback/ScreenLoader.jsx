import RotatingLinesLoader from './RotatingLinesLoader'

const ScreenLoader = ({
  title,
  message,
  blocking = false,
  className = '',
  label = 'Loading',
}) => (
  <div
    className={[
      'ds-screen-loader',
      blocking ? 'ds-screen-loader--blocking' : '',
      className,
    ].filter(Boolean).join(' ')}
    role="status"
    aria-live="polite"
    aria-label={title || label}
  >
    <RotatingLinesLoader ariaLabel={title || label} />
    {title ? <p className="ds-screen-loader-title">{title}</p> : null}
    {message ? <p className="ds-screen-loader-message">{message}</p> : null}
  </div>
)

export default ScreenLoader
