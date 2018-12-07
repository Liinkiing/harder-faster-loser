import {TweenLite} from "gsap";

export const wait = (ms: number): Promise<TimerHandler> =>
  new Promise(resolve => setTimeout(resolve, ms))

export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const promiseAnimation = (animation: TweenLite | gsap.Animation) => {
  return new Promise(resolve =>
    animation
      .eventCallback('onComplete', async () => {
        resolve()
      })
  )
}
