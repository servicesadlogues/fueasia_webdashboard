import { useCallback, useRef } from 'react'

const useRequestSequence = () => {
  const requestId = useRef(0)

  const next = useCallback(() => ++requestId.current, [])
  const isLatest = useCallback((id) => id === requestId.current, [])

  return { next, isLatest }
}

export default useRequestSequence
