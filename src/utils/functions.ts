export const wait = (ms: number): Promise<TimerHandler> =>
  new Promise(resolve => setTimeout(resolve, ms))

export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}
