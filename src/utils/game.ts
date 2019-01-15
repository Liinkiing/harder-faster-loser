import {
  SpamGameScene,
  PasswordGameScene,
  SandwichGameScene,
  TrafficGameScene,
  BootScene,
  DeathscreenScene,
  HomescreenScene,
  PostMinigameScene,
  SplashscreenScene,
  ElevatorGameScene,
} from '../game/scenes'
import { GameBackgroundColor } from './types'
import { green } from './colors'

export interface HFLGameConfig {
  dev: boolean
  suspended: boolean
  fade: boolean
  minigameDuration: number
  remainingPause: number
  backgroundColor: GameBackgroundColor
  fadeColor: string
}

export const gameConfig: GameConfig = {
  antialias: false,
  backgroundColor: green,
  input: {
    gamepad: false,
    keyboard: true,
    mouse: true,
    touch: true,
  },
  physics: {
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
    default: 'arcade',
  },
  title: 'Harder, Faster, Looser',
  version: '1.0',
  disableContextMenu: true,
  width: window.innerWidth,
  height: window.innerHeight,
  zoom: 3,
  parent: 'game',
  scene: [
    BootScene,
    SplashscreenScene,
    HomescreenScene,

    SpamGameScene,
    SandwichGameScene,
    PasswordGameScene,
    TrafficGameScene,
    ElevatorGameScene,

    PostMinigameScene,
    DeathscreenScene,
  ],
  type: Phaser.AUTO,
  pixelArt: true,
}
