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

export enum GameDebugTheme {
  Light = "LIGHT",
  Dark = "DARK"
}
