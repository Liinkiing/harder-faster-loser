import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import { wait } from '../../utils/functions'
import gameManager from '../manager/GameManager'

export default class SplashscreenScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.Splashscreen,
    })
  }

  public create(): void {
    super.create()
    const graphics = this.add.graphics()
    graphics.fillStyle(0xff3300, 1)
    graphics.fillRect(100, 200, 600, 300)
    graphics.fillRect(100, 100, 100, 100)
    this.add.text(120, 110, this.scene.key)
  }

  public update(time: number, delta: number): void {}
}
