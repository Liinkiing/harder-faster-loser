import { GameDebugTheme } from './enums'

export interface DataItem {
  text: string
  percent: number
}

export interface MinigameGuideline {
  title: string
  subtitle: string
}

export interface KeyboardShortcut {
  keys: string[]
  action: () => void
}

export interface GameSettings {
  volume: number
  vibrations: boolean
}

export interface HideableProps {
  hide?: boolean
}

export interface ForceThemeProps {
  forceTheme?: GameDebugTheme
}

export interface TitledProps {
  title?: string
}

export interface PositionneableProps {
  x?: number
  y?: number
  width?: number
  height?: number
  zIndex?: number
  draggable?: boolean
}

export interface ContainerConstructor {
  scene: Phaser.Scene
  x?: number
  y?: number
  children?: Phaser.GameObjects.GameObject[]
}

export interface SpriteConstructor {
  scene: Phaser.Scene
  x: number
  y: number
  texture: string
  frame?: string | integer
}
