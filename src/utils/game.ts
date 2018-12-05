import {
  ActionFirstGameScene,
  ActionSecondGameScene,
  ActionThirdGameScene,
  BootScene,
  ElevatorFirstGameScene,
  ElevatorSecondGameScene,
  HomescreenScene,
  SplashscreenScene,
} from '../game/scenes'

export const gameConfig: GameConfig = {
  antialias: false,
  backgroundColor: "#000000",
  input: {
    gamepad: false,
    keyboard: true,
    mouse: false,
    touch: true,
  },
  physics: {
    arcade: {
      debug: true,
      gravity: {y: 300}
    },
    default: "arcade",
  },
  title: "Harder, Faster, Looser",
  version: "1.0",
  width: window.innerWidth,
  height: window.innerHeight,
  zoom: 3,
  parent: "game",
  scene: [
    BootScene,
    SplashscreenScene,
    HomescreenScene,

    ActionFirstGameScene,
    ActionSecondGameScene,
    ActionThirdGameScene,

    ElevatorFirstGameScene,
    ElevatorSecondGameScene
  ],
  type: Phaser.AUTO,
  pixelArt: true,
}
