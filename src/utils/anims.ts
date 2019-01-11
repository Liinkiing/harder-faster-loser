import { TweenLite } from 'gsap'
import { promiseAnimation } from './functions'

export const appear = (
  $el: Element,
  duration: number = 0.2,
  delay: number = 0
) => {
  return promiseAnimation(
    TweenLite.to($el, duration, {
      opacity: 1,
    }).delay(delay)
  )
}

export const disappear = (
  $el: Element,
  duration: number = 0.2,
  delay: number = 0
) => {
  return promiseAnimation(
    TweenLite.to($el, duration, {
      opacity: 0,
    }).delay(delay)
  )
}
