import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import gameManager from '../manager/GameManager'
import { darkBlue } from '../../utils/colors'

export default class HomescreenScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.Homescreen,
    })
  }

  public create(): void {
    super.create()
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

  private createActionIndicator = () => {
    this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2 - 220, 'shake')
      .setOrigin(0.5, 0.5)
      .setScale(3)
      .setDepth(9999)
      .play('shake_animation')
  }
}
