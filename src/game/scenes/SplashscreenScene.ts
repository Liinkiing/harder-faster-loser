import {scenesKeys} from "../../utils/constants";

export default class SplashscreenScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.Splashscreen
    });
  }

  public preload(): void {
    console.log('Preload SPLASHSCREEN')
  }

  public init(): void {
    console.log('init SPLASHSCREEN')
  }
}
