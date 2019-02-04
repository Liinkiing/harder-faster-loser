import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { randomRange } from '../../utils/functions'
import { setTimeout } from 'timers'

export default class DeathscreenScene extends BaseScene {
  private stageSet?: Phaser.GameObjects.Sprite
  private cloud?: Phaser.GameObjects.Sprite

  constructor() {
    super({
      key: scenesKeys.Deathscreen,
    })
  }

  public create(): void {
    super.create()

    this.stageSet = this.add
      .sprite(0, 0, 'deathscreen_stage_set_animation')
      .setOrigin(0)
      .play('deathscreen_stage_set_animation', true)
    this.stageSet.anims.stop()

    const ratioStageSet = Number(this.game.config.width) / this.stageSet.width
    this.stageSet.setScale(ratioStageSet)
    this.initLightning()
    //this.triggerLightning()

    this.cloud = this.add
      .sprite(0, 0, 'deathscreen_cloud_animation')
      .setOrigin(0)
      .play('deathscreen_cloud_animation')
    this.cloud.anims.pause()

    const ratioCloud = Number(this.game.config.width) / this.cloud.width
    this.cloud.setScale(ratioCloud)

    const rain = this.add
      .sprite(0, 0, 'deathscreen_rain_animation')
      .setOrigin(0)
      .play('deathscreen_rain_animation')

    const ratioRain = Number(this.game.config.width) / rain.width
    rain.setScale(ratioRain)
  }

  private initLightning(): void {
    const delayLightning = Math.floor(randomRange(3000, 4000))

    setTimeout(() => {
      // Lighting
      this.stageSet!.anims.play('deathscreen_stage_set_animation', false, 1)
      this.stageSet!.anims.stop()

      this.cloud!.anims.play('deathscreen_cloud_animation', false, 1)
      this.cloud!.anims.stop()

      setTimeout(() => {
        //Reset lighting
        this.stageSet!.anims.play('deathscreen_stage_set_animation', false, 0)
        this.stageSet!.anims.stop()

        this.cloud!.anims.play('deathscreen_cloud_animation', false, 0)
        this.cloud!.anims.stop()

        this.initLightning()
      }, 300)
    }, delayLightning)
  }
}
