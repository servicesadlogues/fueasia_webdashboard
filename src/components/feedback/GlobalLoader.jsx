import { useEffect, useState } from 'react'
import { isLoaderVisible, subscribeLoader } from '../../feedback/loaderStore'
import RotatingLinesLoader from './RotatingLinesLoader'

const GlobalLoader = () => {
  const [visible, setVisible] = useState(isLoaderVisible())

  useEffect(() => subscribeLoader(setVisible), [])

  if (!visible) return null

  return (
    <div className="ds-global-loader" role="status" aria-live="polite" aria-label="Loading">
      <RotatingLinesLoader ariaLabel="Loading" />
    </div>
  )
}

export default GlobalLoader
