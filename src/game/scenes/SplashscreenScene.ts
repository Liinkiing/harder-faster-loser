import {scenesKeys} from "../../utils/constants";
import {wait} from "../../utils/functions";
import gameManager from "../manager/GameManager";

export default class SplashscreenScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.Splashscreen
    });
  }

  public preload(): void {
    console.log('Preload SPLASHSCREEN')
  }

  public async init() {
    console.log('init SPLASHSCREEN')
    await wait(3000)
    gameManager.loadHomescreen()
  }
}
