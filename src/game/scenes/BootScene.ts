import minigameManager from "../manager/MinigameManager";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }

  public preload(): void {
    console.log('Preload BootScene')
  }

  public init(): void {
    this.scene.start(minigameManager.pickNextGameKey())
  }
}
