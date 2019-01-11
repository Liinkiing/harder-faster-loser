import React, { Component } from 'react'
import { randomString } from '../../utils/functions'

interface Props {
  className?: string
  style?: any
  image: string
  widthFrame: number
  heightFrame: number
  repeat?: number
  isResponsive?: boolean
  steps: number
  scale?: number
  fps: number
  direction?: string
  timeout?: number
  autoplay?: boolean
  loop?: boolean
  startAt?: number
  endAt?: false | number
  background?: string
  backgroundSize?: string
  backgroundRepeat?: string
  backgroundPosition?: string
  getInstance?: (args: any) => void
  onClick?: (args: any) => void
  onDoubleClick?: (args: any) => void
  onMouseMove?: (args: any) => void
  onMouseEnter?: (args: any) => void
  onMouseLeave?: (args: any) => void
  onMouseOver?: (args: any) => void
  onMouseOut?: (args: any) => void
  onMouseDown?: (args: any) => void
  onMouseUp?: (args: any) => void
  onInit?: (args: any) => void
  onResize?: any
  onPlay?: (args: any) => void
  onPause?: (args: any) => void
  onLoopComplete?: any
  onEachFrame?: any
  onEnterFrame?: false | []
}

type Direction = 'forward' | 'rewind'

type ParamInfo =
  | 'direction'
  | 'frame'
  | 'fps'
  | 'steps'
  | 'width'
  | 'height'
  | 'scale'
  | 'isPlaying'
  | 'isPaused'
  | 'completeLoopCicles'

class Spritesheet extends Component<Props> {
  public static defaultProps = {
    className: '',
    style: {},
    isResponsive: true,
    direction: 'forward',
    timeout: 0,
    scale: 1,
    autoplay: true,
    loop: true,
    startAt: 0,
    endAt: false,
    background: '',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '',
    repeat: -1,
    getInstance: () => {},
    onClick: () => {},
    onDoubleClick: () => {},
    onMouseMove: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseOver: () => {},
    onMouseOut: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
    onInit: () => {},
    onResize: false,
    onPlay: () => {},
    onPause: () => {},
    onLoopComplete: false,
    onEachFrame: false,
    onEnterFrame: false,
  }

  private intervalSprite: number | boolean
  private isResponsive: boolean
  private startAt: number
  private fps: number
  private steps: number
  private completeLoopCicles: number
  private isPlaying: boolean
  private endAt: number
  private spriteScale: number
  private spriteEl: Element | HTMLElement | number | null
  private direction: Direction
  private frame: number
  private spriteElContainer: any
  private spriteElMove: HTMLElement | Element | null
  private imageSprite: HTMLImageElement | null
  private cols: number | null
  private rows: number | null
  private id: string

  constructor(props: Props) {
    super(props)

    const {
      isResponsive,
      startAt,
      endAt,
      fps,
      steps,
      direction,
      scale,
    } = this.props

    this.id = `spritesheet--${randomString(8)}`
    this.spriteEl = this.spriteElContainer = this.spriteElMove = this.imageSprite = this.cols = this.rows = null
    this.intervalSprite = false
    // @ts-ignore
    this.isResponsive = isResponsive
    // @ts-ignore
    this.startAt = this.setStartAt(startAt)
    // @ts-ignore
    this.endAt = this.setEndAt(endAt)
    this.fps = fps
    this.steps = steps
    this.completeLoopCicles = 0
    this.isPlaying = false
    this.spriteScale = scale!
    this.direction = this.setDirection(direction as Direction)
    this.frame = this.startAt
      ? this.startAt
      : this.direction === 'rewind'
      ? this.steps - 1
      : 0
  }

  public componentDidMount() {
    this.init()
  }

  public componentWillUnmount() {
    // @ts-ignore
    window.removeEventListener('resize', this.resize)
  }

  public renderElements = () => {
    const {
      image,
      className,
      style,
      widthFrame,
      heightFrame,
      background,
      backgroundSize,
      backgroundRepeat,
      backgroundPosition,
      onClick,
      onDoubleClick,
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onMouseOut,
      onMouseDown,
      onMouseUp,
    } = this.props

    const containerStyles = {
      position: 'relative',
      overflow: 'hidden',
      width: `${widthFrame}px`,
      height: `${heightFrame}px`,
      transform: `scale(${this.spriteScale})`,
      transformOrigin: '0 0',
      backgroundImage: `url(${background})`,
      backgroundSize,
      backgroundRepeat,
      backgroundPosition,
    }

    const moveStyles = {
      overflow: 'hidden',
      backgroundRepeat: 'no-repeat',
      display: 'table-cell',
      backgroundImage: `url(${image})`,
      width: `${widthFrame}px`,
      height: `${heightFrame}px`,
      transformOrigin: '0 50%',
    }

    const elMove = React.createElement('div', {
      className: 'react-responsive-spritesheet-container__move',
      style: moveStyles,
    })

    const elContainer = React.createElement(
      'div',
      {
        className: 'react-responsive-spritesheet-container',
        style: containerStyles,
      },
      elMove
    )
    const elSprite = React.createElement(
      'div',
      {
        className: `spritesheet ${this.id} ${className}`,
        style,
        // @ts-ignore
        onClick: () => onClick(this.setInstance()),
        // @ts-ignore
        onDoubleClick: () => onDoubleClick(this.setInstance()),
        // @ts-ignore
        onMouseMove: () => onMouseMove(this.setInstance()),
        // @ts-ignore
        onMouseEnter: () => onMouseEnter(this.setInstance()),
        // @ts-ignore
        onMouseLeave: () => onMouseLeave(this.setInstance()),
        // @ts-ignore
        onMouseOver: () => onMouseOver(this.setInstance()),
        // @ts-ignore
        onMouseOut: () => onMouseOut(this.setInstance()),
        // @ts-ignore
        onMouseDown: () => onMouseDown(this.setInstance()),
        // @ts-ignore
        onMouseUp: () => onMouseUp(this.setInstance()),
      },
      elContainer
    )

    return elSprite
  }

  public init = () => {
    const {
      image,
      widthFrame,
      heightFrame,
      autoplay,
      getInstance,
      onInit,
    } = this.props

    const imgLoadSprite = new Image()
    imgLoadSprite.src = image
    imgLoadSprite.onload = () => {
      if (!(document && document.querySelector(`.${this.id}`))) {
        return
      }
      this.imageSprite = imgLoadSprite
      this.cols =
        this.imageSprite.width === widthFrame
          ? 1
          : this.imageSprite.width / widthFrame
      this.rows =
        this.imageSprite.height === heightFrame
          ? 1
          : this.imageSprite.height / heightFrame
      this.spriteEl = document.querySelector(`.${this.id}`)
      this.spriteElContainer = this.spriteEl!.querySelector(
        '.react-responsive-spritesheet-container'
      )
      this.spriteElMove = this.spriteElContainer.querySelector(
        '.react-responsive-spritesheet-container__move'
      )
      this.resize(false)
      // @ts-ignore
      window.addEventListener('resize', this.resize)
      this.moveImage(false)
      setTimeout(() => {
        this.resize(false)
      }, 10)
      if (autoplay) {
        this.play(true)
      }
      const instance = this.setInstance()
      // @ts-ignore
      getInstance(instance)
      // @ts-ignore
      onInit(instance)
    }

    imgLoadSprite.onerror = () => {
      throw new Error(`Failed to load image ${imgLoadSprite.src}`)
    }
  }

  public resize = (callback = true) => {
    const { widthFrame, onResize, scale } = this.props

    if (this.isResponsive) {
      this.spriteScale =
        ((this.spriteEl! as HTMLElement).offsetWidth / widthFrame) * scale!
      this.spriteElContainer.style.transform = `scale(${this.spriteScale})`
      this.spriteElContainer.style.imageRendering = 'pixelated'
      ;(this.spriteEl! as HTMLElement).style.height = `${this.getInfo(
        'height'
      )}px`
      if (callback && onResize) {
        onResize(this.setInstance())
      }
    }
  }

  public play = (withTimeout = false) => {
    const { onPlay, timeout } = this.props

    if (!this.isPlaying) {
      setTimeout(
        () => {
          // @ts-ignore
          onPlay(this.setInstance())
          this.setIntervalPlayFunctions()
          this.isPlaying = true
        },
        withTimeout ? timeout : 0
      )
    }
  }

  public setIntervalPlayFunctions = () => {
    if (this.intervalSprite) {
      // @ts-ignore
      // @ts-ignore
      clearInterval(this.intervalSprite)
    }
    // @ts-ignore
    this.intervalSprite = setInterval(() => {
      if (this.isPlaying) {
        this.moveImage()
      }
    }, 1000 / this.fps)
  }

  public moveImage = (play = true) => {
    const {
      onEnterFrame,
      onEachFrame,
      loop,
      onLoopComplete,
      repeat,
    } = this.props

    const currentRow = Math.floor(this.frame / this.cols!)
    const currentCol = this.frame - this.cols! * currentRow
    ;(this.spriteElMove! as HTMLElement).style.backgroundPosition = `-${this
      .props.widthFrame * currentCol}px -${this.props.heightFrame *
      currentRow}px`

    if (onEnterFrame) {
      onEnterFrame.map((frameAction, i) => {
        // @ts-ignore
        if (frameAction.frame === this.frame && frameAction.callback) {
          // @ts-ignore
          frameAction.callback()
        }
      })
    }

    if (play) {
      if (this.direction === 'rewind') {
        this.frame -= 1
      } else {
        this.frame += 1
      }
      if (onEachFrame) {
        onEachFrame(this.setInstance())
      }
    }

    if (this.isPlaying) {
      if (
        (this.direction === 'forward' &&
          (this.frame === this.steps || this.frame === this.endAt)) ||
        (this.direction === 'rewind' &&
          (this.frame === -1 || this.frame === this.endAt))
      ) {
        if (loop) {
          if (onLoopComplete) {
            onLoopComplete(this.setInstance())
          }
          if (repeat === -1) {
            this.completeLoopCicles += 1
            this.frame = this.startAt
              ? this.startAt
              : this.direction === 'rewind'
              ? this.steps - 1
              : 0
          } else if (repeat === 0) {
            this.pause()
          } else {
            this.completeLoopCicles += 1
            this.frame = this.startAt
              ? this.startAt
              : this.direction === 'rewind'
              ? this.steps - 1
              : 0
            if (this.completeLoopCicles === repeat!) {
              this.pause()
            }
          }
        } else {
          this.pause()
        }
      }
    }
  }

  public pause = () => {
    const { onPause } = this.props

    this.isPlaying = false
    // @ts-ignore
    clearInterval(this.intervalSprite)
    // @ts-ignore
    onPause(this.setInstance())
  }

  public goToAndPlay = (frame: number): void => {
    this.frame = frame ? frame : this.frame
    this.play()
  }

  public goToAndPause = (frame: number): void => {
    this.pause()
    this.frame = frame ? frame : this.frame
    this.moveImage()
  }

  public setStartAt = (frame: number): number => {
    this.startAt = frame ? frame - 1 : 0
    return this.startAt
  }

  public setEndAt = (frame: number): number => {
    this.endAt = frame
    return this.endAt
  }

  public setFps(fps: number) {
    this.fps = fps
    this.setIntervalPlayFunctions()
  }

  public setDirection = (direction: Direction): Direction => {
    this.direction = direction === 'rewind' ? 'rewind' : 'forward'
    return this.direction
  }

  public getInfo = (param: ParamInfo) => {
    switch (param) {
      case 'direction':
        return this.direction
      case 'frame':
        return this.frame
      case 'fps':
        return this.fps
      case 'steps':
        return this.steps
      case 'width':
        return this.spriteElContainer.getBoundingClientRect().width
      case 'height':
        return this.spriteElContainer.getBoundingClientRect().height
      case 'scale':
        return this.spriteScale
      case 'isPlaying':
        return this.isPlaying
      case 'isPaused':
        return !this.isPlaying
      case 'completeLoopCicles':
        return this.completeLoopCicles
      default:
        throw new Error(
          `Invalid param \`${param}\` requested by Spritesheet.getinfo(). See the documentation on https://github.com/danilosetra/react-responsive-spritesheet`
        )
    }
  }

  public setInstance() {
    return {
      play: this.play,
      pause: this.pause,
      goToAndPlay: this.goToAndPlay,
      goToAndPause: this.goToAndPause,
      setStartAt: this.setStartAt,
      setEndAt: this.setEndAt,
      setFps: this.setFps,
      setDirection: this.setDirection,
      getInfo: this.getInfo,
    }
  }

  public render() {
    return this.renderElements()
  }
}

export default Spritesheet
