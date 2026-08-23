import { useEffect, useState } from 'react'
import { isLoaderVisible, subscribeLoader } from '../../feedback/loaderStore'

const GlobalLoader = () => {
  const [visible, setVisible] = useState(isLoaderVisible())

  useEffect(() => subscribeLoader(setVisible), [])

  if (!visible) return null

  return (
    <div className="ds-global-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="ds-global-loader-panel">
        <div className="spinner" style={{ width: '2.5rem', height: '2.5rem', borderWidth: '3px' }} />
        <p className="ds-global-loader-text">Please wait…</p>
      </div>
    </div>
  )
}

export default GlobalLoader
