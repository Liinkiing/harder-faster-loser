import {scenesKeys} from "../../utils/constants";

export default class DeathscreenScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.Deathscreen
    });
  }

  public preload(): void {
    console.log('Preload DEATHSCREEN')
  }

  public init(): void {
    console.log('init DEATHSCREEN')
  }
}
