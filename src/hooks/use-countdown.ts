'use client'

import { useState, useEffect, useCallback } from 'react'

export function useCountdown(initialCount: number = 60) {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const start = useCallback(() => {
    setCount(initialCount)
    setIsActive(true)
  }, [initialCount])

  const stop = useCallback(() => {
    setCount(0)
    setIsActive(false)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && count > 0) {
      interval = setInterval(() => {
        setCount(count => count - 1)
      }, 1000)
    } else if (count === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, count])

  return { count, isActive, start, stop }
}
