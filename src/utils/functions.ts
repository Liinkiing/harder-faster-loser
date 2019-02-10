import { TweenLite } from 'gsap'
import { GameBackgroundColor } from './types'

export const wait = (ms: number): Promise<TimerHandler> =>
  new Promise(resolve => setTimeout(resolve, ms))

export const uuid = (): string => {
  function _p8(s?: boolean) {
    const p = (Math.random().toString(16) + '000000000').substr(2, 8)
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p
  }
  return _p8() + _p8(true) + _p8(true) + _p8()
}

export const gameWait = (
  clock: Phaser.Time.Clock,
  ms: number
): Promise<Phaser.Time.TimerEvent> =>
  new Promise(resolve => {
    return clock.addEvent({
      callback: resolve,
      delay: ms,
    })
  })

export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const promiseAnimation = (animation: TweenLite | gsap.Animation) => {
  return new Promise(resolve =>
    animation.eventCallback('onComplete', async () => {
      resolve()
    })
  )
}

export const shuffle = <T>(a: T[]): T[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }

  return a
}

export const gameBackgroundColorToCss = (
  backgroundColor: GameBackgroundColor
): string => {
  if (typeof backgroundColor === 'object') {
    const { r, g, b, a } = backgroundColor
    return `rgba(${r},${g},${b},${a})`
  }

  return String(backgroundColor)
}

export const randomString = (length: number) =>
  Math.random()
    .toString(36)
    .substring(length)
