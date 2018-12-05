import {scenesKeys} from "../../utils/constants";

export default class HomescreenScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.Homescreen
    });
  }

  public preload(): void {
    console.log('Preload HOMESCREEN')
  }

  public init(): void {
    console.log('init HOMESCREEN')
  }
}
