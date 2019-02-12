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
  SubwayGameScene,
  LeaderboardsScene,
  IntroductionScene,
} from '../game/scenes'
import { GameBackgroundColor } from './types'
import { black, green } from './colors'

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
  backgroundColor: black,
  input: {
    gamepad: false,
    keyboard: true,
    mouse: true,
    touch: true,
  },
  physics: {
    arcade: {
      debug: process.env.NODE_ENV === 'development',
      gravity: { y: 0 },
    },
    default: 'arcade',
  },
  title: 'Harder, Faster, Loser',
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
    IntroductionScene,

    SpamGameScene,
    SandwichGameScene,
    PasswordGameScene,
    TrafficGameScene,
    ElevatorGameScene,
    SubwayGameScene,

    PostMinigameScene,
    DeathscreenScene,
    LeaderboardsScene,
  ],
  type: Phaser.AUTO,
  pixelArt: true,
}
