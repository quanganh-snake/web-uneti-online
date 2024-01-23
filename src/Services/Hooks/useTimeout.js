import { useEffect } from 'react'

export function useTimeout() {
  let timeoutHandle

  const registerTimeout = (fn, delay) => {
    cancelTimeout()
    timeoutHandle = setTimeout(fn, delay)
  }
  const cancelTimeout = () => clearTimeout(timeoutHandle)

  useEffect(() => {
    return cancelTimeout
  }, [])

  return {
    registerTimeout,
    cancelTimeout,
  }
}
