import {useEffect, useState} from 'react'
import {GameDebugTheme} from "./interfaces";
import gameDebugStore from "../store/GameDebugStore";

export const useResize = (): {width: number, height: number} =>  {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const listener = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [window.innerWidth, window.innerHeight])

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

export const useClassTheme = (forceTheme?: GameDebugTheme): string | null => {
  const { isDarkTheme } = gameDebugStore

  if(!forceTheme && isDarkTheme) {
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
