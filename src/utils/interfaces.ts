export interface GameSettings {
  volume: number
}

export interface ForceThemeProps {
  forceTheme?: GameDebugTheme
}

export enum GameDebugTheme {
  Light = "LIGHT",
  Dark = "DARK"
}
