import { useCallback, useRef } from 'react'

export const useDebounce = () => {
  const debounceId = useRef(null)

  const debounce = useCallback((callback, time = 500) => {
    if (debounceId.current) clearTimeout(debounceId.current)
    const id = setTimeout(() => {
      callback()
    }, time)
    debounceId.current = id
  }, [])

  return {
    debounce
  }
}
