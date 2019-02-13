type ShakeEventHandler = () => void

interface Options {
  threshold: number
  timeout: number
}

const DEFAULT_OPTIONS: Options = {
  threshold: 5,
  timeout: 400,
}

export class Shaker implements EventTarget {
  public static hasDeviceMotion() {
    return 'ondevicemotion' in window
  }

  private delegate = document.createDocumentFragment()
  private lastX: number | null = null
  private lastY: number | null = null
  private lastZ: number | null = null
  private lastTime = new Date()
  private readonly options: Options
  private readonly event: Event = new Event('shake')

  constructor(options?: Partial<Options>) {
    this.options = { ...DEFAULT_OPTIONS, ...options }
  }

  public reset = (): void => {
    this.lastTime = new Date()
    this.lastX = null
    this.lastY = null
    this.lastZ = null
  }

  public start = (): void => {
    this.reset()
    if (Shaker.hasDeviceMotion) {
      window.addEventListener('devicemotion', this.onDeviceMotion)
    }
  }

  public stop = (): void => {
    if (Shaker.hasDeviceMotion) {
      window.removeEventListener('devicemotion', this.onDeviceMotion)
    }
    this.reset()
  }

  public addEventListener(
    type: 'shake',
    listener: ShakeEventHandler | null,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.delegate.addEventListener(type, listener, options)
  }

  public removeEventListener(
    type: 'shake',
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean
  ): void {
    this.delegate.removeEventListener(type, callback, options)
  }

  public dispatchEvent(event: Event): boolean {
    return this.delegate.dispatchEvent(event)
  }

  private onDeviceMotion = (e: DeviceMotionEvent): void => {
    const current = e.accelerationIncludingGravity!
    let currentTime: Date
    let diff: number
    let deltaX: number
    let deltaY: number
    let deltaZ: number

    if (this.lastX === null && this.lastY === null && this.lastZ === null) {
      this.lastX = current.x
      this.lastY = current.y
      this.lastZ = current.z
      return
    }

    deltaX = Math.abs(this.lastX! - current.x!)
    deltaY = Math.abs(this.lastY! - current.y!)
    deltaZ = Math.abs(this.lastZ! - current.z!)

    if (
      (deltaX > this.options.threshold && deltaY > this.options.threshold) ||
      (deltaX > this.options.threshold && deltaZ > this.options.threshold) ||
      (deltaY > this.options.threshold && deltaZ > this.options.threshold)
    ) {
      currentTime = new Date()
      diff = currentTime.getTime() - this.lastTime.getTime()

      if (diff > this.options.timeout) {
        this.dispatchEvent(this.event)
        this.lastTime = new Date()
      }
    }

    this.lastX = current.x
    this.lastY = current.y
    this.lastZ = current.z
  }
}
