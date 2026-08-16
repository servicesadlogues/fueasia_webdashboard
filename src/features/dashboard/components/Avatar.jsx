import { useState } from 'react'
import { initials } from '../utils/labels'

const Avatar = ({ name, src, className = '' }) => {
  const [failed, setFailed] = useState(false)
  const showPhoto = Boolean(src) && !failed

  return (
    <div className={`ds-avatar ${className}`.trim()} aria-hidden="true">
      {showPhoto ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        initials(name)
      )}
    </div>
  )
}

export default Avatar
