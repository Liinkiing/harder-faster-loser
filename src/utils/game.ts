import BootScene from "../game/scenes/BootScene";

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
  scene: [BootScene],
  type: Phaser.AUTO,
  pixelArt: true,
}
