import { useEffect, useState } from 'react'

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
