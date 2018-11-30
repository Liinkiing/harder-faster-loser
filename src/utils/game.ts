import {
  ActionFirstGameScene,
  ActionSecondGameScene,
  ActionThirdGameScene,
  BootScene,
  ElevatorFirstGameScene, ElevatorSecondGameScene
} from '../game/scenes'

export const gameConfig: GameConfig = {
  antialias: false,
  backgroundColor: "#000000",
  input: {
    gamepad: false,
    keyboard: true,
    mouse: false,
    touch: false,
  },
  physics: {
    arcade: {
      debug: true,
      gravity: {y: 300}
    },
    default: "arcade",
  },
  title: "Test game",
  version: "1.1",
  width: 256,
  zoom: 3,
  parent: "game",
  scene: [BootScene, ActionFirstGameScene, ActionSecondGameScene, ActionThirdGameScene, ElevatorFirstGameScene, ElevatorSecondGameScene],
  type: Phaser.AUTO,
  pixelArt: true,
}
