import {scenesKeys} from "../../utils/constants";
import BaseScene from "./BaseScene";
import {wait} from "../../utils/functions";
import gameManager from "../manager/GameManager";

export default class SplashscreenScene extends BaseScene {

  constructor() {
    super({
      key: scenesKeys.Splashscreen
    });
  }

  public async create() {
    console.log(`create (${this.scene.key})`)
    const graphics = this.add.graphics()
    graphics.fillStyle(0xff3300, 1)
    graphics.fillRect(100,200,600,300)
    graphics.fillRect(100,100,100,100)
    this.add.text(120,110,this.scene.key)
    await wait(2000)
    gameManager.loadHomescreen()
  }

  public update(time: number, delta: number): void {
  }

}
