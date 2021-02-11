import { useEffect, useState, useCallback } from 'react'
import { LG, MD, SM } from 'utils/theme'

export const useWindowSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : -1,
      height: isClient ? window.innerHeight : -1
    }),
    [isClient]
  )

  const [windowSize, setWindowSize] = useState(getSize)
  const maxSmall = windowSize.width <= SM
  const maxMedium = windowSize.width <= MD
  const maxLarge = windowSize.width <= LG

  useEffect(() => {
    if (!isClient) return

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient])

  return { ...windowSize, maxSmall, maxMedium, maxLarge }
}

export default useWindowSize
