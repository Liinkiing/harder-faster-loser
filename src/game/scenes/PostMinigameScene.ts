import {scenesKeys} from "../../utils/constants";

export default class PostMinigameScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.PostMinigameScene
    });
  }

  public preload(): void {
    console.log('Preload DEATHSCREEN')
  }

  public init(): void {
    console.log('init DEATHSCREEN')
  }
}
