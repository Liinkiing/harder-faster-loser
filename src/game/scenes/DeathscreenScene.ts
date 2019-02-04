import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { randomRange } from '../../utils/functions'
import { setTimeout } from 'timers'
import { Emitter } from '../manager/GameManager'

export default class DeathscreenScene extends BaseScene {
  private stageSet?: Phaser.GameObjects.Sprite
  private cloud?: Phaser.GameObjects.Sprite
  private rain?: Phaser.GameObjects.Sprite
  private tombstones?: Phaser.GameObjects.Sprite
  private timeoutLightning?: any
  private timeoutResetLightning?: any

  constructor() {
    super({
      key: scenesKeys.Deathscreen,
    })
  }

  public create(): void {
    super.create()
    this.initFirstPart()
    setTimeout(() => {
      this.destroyFirstPart()
    }, 3000)
  }

  private destroyFirstPart(): void {
    // Destroy timeout
    clearTimeout(this.timeoutLightning)
    clearTimeout(this.timeoutResetLightning)

    // Destroy sprites
    this.stageSet!.destroy()
    this.cloud!.destroy()
    this.rain!.destroy()

    this.initSecondPart()
  }

  private initFirstPart(): void {
    this.stageSet = this.add
      .sprite(0, 0, 'deathscreen_stage_set_animation')
      .setOrigin(0)
      .play('deathscreen_stage_set_animation', true)
    this.stageSet.anims.stop()

    const ratioStageSet = Number(this.game.config.width) / this.stageSet.width
    this.stageSet.setScale(ratioStageSet)

    this.cloud = this.add
      .sprite(0, 0, 'deathscreen_cloud_animation')
      .setOrigin(0)
      .play('deathscreen_cloud_animation')
    this.cloud.anims.pause()

    const ratioCloud = Number(this.game.config.width) / this.cloud.width
    this.cloud.setScale(ratioCloud)

    this.rain = this.add
      .sprite(0, 0, 'deathscreen_rain_animation')
      .setOrigin(0)
      .play('deathscreen_rain_animation')

    const ratioRain = Number(this.game.config.width) / this.rain.width
    this.rain.setScale(ratioRain)

    this.initLightning()
  }

  private initLightning(): void {
    const delayLightning = Math.floor(randomRange(3000, 4000))
    this.timeoutLightning = setTimeout(() => {
      if (this.stageSet && this.cloud) {
        if (this.stageSet.anims && this.cloud.anims) {
          // Lighting
          this.stageSet!.anims.play('deathscreen_stage_set_animation', false, 1)
          this.stageSet!.anims.stop()

          this.cloud!.anims.play('deathscreen_cloud_animation', false, 1)
          this.cloud!.anims.stop()

          this.timeoutResetLightning = setTimeout(() => {
            //Reset lighting
            this.stageSet!.anims.play(
              'deathscreen_stage_set_animation',
              false,
              0
            )
            this.stageSet!.anims.stop()

            this.cloud!.anims.play('deathscreen_cloud_animation', false, 0)
            this.cloud!.anims.stop()

            this.initLightning()
          }, 300)
        }
      }
    }, delayLightning)
  }

  private initSecondPart(): void {
    this.tombstones = this.add
      .sprite(0, 0, 'deathscreen_tombstones')
      .setOrigin(0)

    const ratioTombestones =
      Number(this.game.config.width) / this.tombstones.width
    this.tombstones.setScale(ratioTombestones)
  }
}
