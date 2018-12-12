import { useEffect, useRef, useState } from 'react'
import gameDebugStore from '../store/GameDebugStore'
import { GameDebugTheme } from './enums'
import { KeyboardShortcut } from './interfaces'

export const useResize = (): { width: number; height: number } => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(
    () => {
      const listener = () =>
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      window.addEventListener('resize', listener)

      return () => {
        window.removeEventListener('resize', listener)
      }
    },
    [window.innerWidth, window.innerHeight]
  )

  return size
}

export const useKeyboardInput = (listener: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useKeyboardInput(e => {
    shortcuts.forEach(shortcut => {
      if (
        shortcut.keys.some(key => key.toLowerCase() === e.key.toLowerCase())
      ) {
        shortcut.action()
      }
    })
  })
}

export const usePrevious = (value: any) => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })

  return ref.current!
}

export const useClassTheme = (forceTheme?: GameDebugTheme): string | null => {
  const { isDarkTheme } = gameDebugStore

  if (!forceTheme && isDarkTheme) {
    return 'is-dark'
  }

  if (!isDarkTheme && forceTheme && forceTheme === GameDebugTheme.Dark) {
    return 'is-dark'
  } else if (isDarkTheme && forceTheme && forceTheme === GameDebugTheme.Dark) {
    return 'is-dark'
  } else if (forceTheme && forceTheme === GameDebugTheme.Light) {
    return null
  }

  return null
}
