import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { black, green } from '../../utils/colors'
import gameManager from '../manager/GameManager'

const SOUND_WIND = 'wind'

export default class SplashscreenScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.Splashscreen,
    })
  }

  public create(): void {
    super.create()
    gameManager.audio.playAmbientMusic(SOUND_WIND)
    gameStore.changeConfig({
      backgroundColor: black,
      fadeColor: black,
    })
    const splashscreen = this.createSplashscreenIntroduction()
    splashscreen.anims.play('splashscreen_01_animation')
  }

  public update(time: number, delta: number): void {}

  protected destroy(): void {
    gameStore.changeConfig({
      backgroundColor: green,
      fadeColor: green,
    })
  }

  private createSplashscreenIntroduction = (): Phaser.GameObjects.Sprite => {
    return this.add
      .sprite(window.innerWidth / 2, window.innerHeight / 2, 'splashscreen_01')
      .setScale(8 / gameStore.ratioResolution)
      .setOrigin(0.5, 0.5)
  }
}
