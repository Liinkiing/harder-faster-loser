import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'

export default class DeathscreenScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.Deathscreen,
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
}
