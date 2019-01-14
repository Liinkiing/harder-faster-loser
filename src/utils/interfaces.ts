import { GameDebugTheme } from './enums'

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
