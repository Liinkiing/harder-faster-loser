import {scenesKeys} from "../../utils/constants";
import BaseScene from "./BaseScene";

export default class HomescreenScene extends BaseScene {

  constructor() {
    super({
      key: scenesKeys.Homescreen
    });
  }

  public create(): void {
    const graphics = this.add.graphics()
    graphics.fillStyle(0xff9933, 1)
    graphics.fillRect(100,200,600,300)
    graphics.fillRect(200,100,100,100)
    this.add.text(220,110,this.scene.key)
  }

  public update(time: number, delta: number): void {
  }


}
