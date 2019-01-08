import {
  SpamGameScene,
  ActionSecondGameScene,
  ActionThirdGameScene,
  BootScene,
  DeathscreenScene,
  ElevatorFirstGameScene,
  ElevatorSecondGameScene,
  HomescreenScene,
  PostMinigameScene,
  SplashscreenScene,
} from '../game/scenes'
import { GameBackgroundColor } from './types'
import { green } from './colors'

export interface HFLGameConfig {
  fade: boolean
  minigameDuration: number
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
      gravity: { y: 300 },
    },
    default: 'arcade',
  },
  title: 'Harder, Faster, Looser',
  version: '1.0',
  width: window.innerWidth,
  height: window.innerHeight,
  zoom: 3,
  parent: 'game',
  scene: [
    BootScene,
    SplashscreenScene,
    HomescreenScene,

    SpamGameScene,
    ActionSecondGameScene,
    ActionThirdGameScene,

    ElevatorFirstGameScene,
    ElevatorSecondGameScene,

    PostMinigameScene,
    DeathscreenScene,
  ],
  type: Phaser.AUTO,
  pixelArt: true,
}
