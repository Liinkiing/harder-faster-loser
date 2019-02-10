import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import gameManager from '../manager/GameManager'
import { darkBlue } from '../../utils/colors'
import { Shaker } from '../../Shaker'

export default class HomescreenScene extends BaseScene {
  private shaker?: Shaker

  constructor() {
    super({
      key: scenesKeys.Homescreen,
    })
  }

  public create(): void {
    super.create()
    if (Shaker.hasDeviceMotion()) {
      this.shaker = new Shaker()
      this.shaker.start()
      this.shaker.addEventListener('shake', this.onShake)
    }
    gameManager.audio.resetDetune()
    gameManager.audio.playBg()
    gameManager.changeBackgroundColor(darkBlue)
    // this.createActionIndicator()
    this.add
      .sprite(
        window.innerWidth / 2,
        window.innerHeight / 2,
        'intro_sleep_animation'
      )
      .setOrigin(0.5, 0.5)
      .setScale(18 / gameStore.ratioResolution)
      .play('intro_sleep_animation')
  }

  public update(time: number, delta: number): void {}

  protected destroy(): void {
    super.destroy()
    if (this.shaker) {
      this.shaker.stop()
      this.shaker.removeEventListener('shake', this.onShake)
    }
  }

  private onShake = (): void => {}

  private createActionIndicator = () => {
    this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2 - 220, 'shake')
      .setOrigin(0.5, 0.5)
      .setScale(3)
      .setDepth(9999)
      .play('shake_animation')
  }
}
