import {
  ChangeEvent,
  InputIdentityList,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import gameDebugStore from '../store/GameDebugStore'
import { GameDebugTheme } from './enums'
import { KeyboardShortcut } from './interfaces'
import gameManager from '../game/manager/GameManager'

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

export const useInputValue = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue)
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue((e.target.value as unknown) as T)
  }, [])

  return {
    value,
    onChange,
  }
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

export const useGameloop = (
  onLoop: () => void,
  inputs: InputIdentityList = []
): void => {
  useEffect(() => {
    gameManager.activeScene!.time.addEvent({
      callback: onLoop,
      delay: 16,
      repeat: -1,
    })
  }, inputs)
}

export const useInterval = (
  handler: TimerHandler,
  ms: number,
  inputs?: InputIdentityList
): void => {
  useEffect(() => {
    const interval = setInterval(handler, ms)

    return () => {
      clearInterval(interval)
    }
  }, inputs)
}

export const useTimeout = (
  handler: TimerHandler,
  ms: number,
  inputs?: InputIdentityList
): void => {
  useEffect(() => {
    const interval = setTimeout(handler, ms)

    return () => {
      clearInterval(interval)
    }
  }, inputs)
}

export const useRaf = (ms: number = 1e12, delay: number = 0): number => {
  const [elapsed, set] = useState<number>(0)

  useLayoutEffect(
    () => {
      let raf: number
      let timerStop: NodeJS.Timeout
      let start: number

      const onFrame = () => {
        const time = Math.min(1, (Date.now() - start) / ms)
        set(time)
        loop()
      }
      const loop = () => {
        raf = requestAnimationFrame(onFrame)
      }
      const onStart = () => {
        timerStop = setTimeout(() => {
          cancelAnimationFrame(raf)
          set(1)
        }, ms)
        start = Date.now()
        loop()
      }
      const timerDelay = setTimeout(onStart, delay)

      return () => {
        clearTimeout(timerStop)
        clearTimeout(timerDelay)
        cancelAnimationFrame(raf)
      }
    },
    [ms, delay]
  )

  return elapsed
}
