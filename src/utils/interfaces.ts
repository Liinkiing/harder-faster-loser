export interface GameSettings {
  volume: number
}

export interface ForceThemeProps {
  forceTheme?: GameDebugTheme
}

export interface PositionneableProps {
  x?: number,
  y?: number,
  zIndex?: number,
  draggable?: boolean,
}

export interface ContainerConstructor {
  scene: Phaser.Scene,
  spamTexture: string,
  x?: number,
  y?: number,
  children?: Phaser.GameObjects.GameObject[]
}

export interface SpriteConstructor {
  scene: Phaser.Scene,
  x: number,
  y: number,
  texture: string,
  frame?: string | integer
}

export enum GameDebugTheme {
  Light = "LIGHT",
  Dark = "DARK"
}
