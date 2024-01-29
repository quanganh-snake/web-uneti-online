import { useEffect } from 'react'
import { unrefElement } from '@/Services/Utils/reactUtils'

const defaultWindow = typeof window !== 'undefined' ? window : undefined

export function useClickOutside(target, handler, options = {}) {
  const {
    window = defaultWindow,
    event = 'pointerdown',
    allowEsc = true,
  } = options

  function eventPath(event) {
    const path = (event.composedPath && event.composedPath()) || event.path

    if (path != null) return path

    function getParents(node, memo = []) {
      const parentNode = node.parentNode

      return parentNode
        ? getParents(parentNode, memo.concat([parentNode]))
        : memo
    }

    return [event.target].concat(getParents(event.target))
  }

  useEffect(() => {
    if (!window) return

    const listener = (event) => {
      const el = unrefElement(target)
      if (!el) return

      if (el === event.target || eventPath(event).includes(el)) return

      handler(event)
    }

    const listenerKeyDown = (event) => {
      const el = unrefElement(target)
      if (!el) return

      // TODO: move magic number [27] to Constants
      if (allowEsc && event.keyCode == 27 /** 27: Phím Esc */) {
        handler(event)
      }
    }

    window.addEventListener(event, listener)
    if (allowEsc) window.addEventListener('keydown', listenerKeyDown)

    return () => {
      window.removeEventListener(event, listener)
      if (allowEsc) window.removeEventListener('keydown', listenerKeyDown)
    }
  }, [target, handler, window, event, allowEsc])
}
