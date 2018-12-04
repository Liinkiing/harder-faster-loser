import {scenesKeys} from "../../utils/constants";
import gameManager from "../manager/GameManager";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: scenesKeys.Boot
    });
  }

  public init(): void {
    console.log('init BootScene')
  }

  public preload(): void {
    console.log('Preload BootScene')
    gameManager.loadSplashscreen()
  }
}
