import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'

export default class DeathscreenScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.Deathscreen,
    })
  }

  public create(): void {
    super.create()

    const stage_set = this.add
      .sprite(0, 0, 'deathscreen_stage_set_animation')
      .setOrigin(0)
      .play('deathscreen_stage_set_animation')
    const ratioStageSet = Number(this.game.config.width) / stage_set.width
    stage_set.setScale(ratioStageSet)

    const cloud = this.add
      .sprite(0, 0, 'deathscreen_cloud_animation')
      .setOrigin(0)
      .play('deathscreen_cloud_animation')

    const ratioCloud = Number(this.game.config.width) / cloud.width
    cloud.setScale(ratioCloud)

    const rain = this.add
      .sprite(0, 0, 'deathscreen_rain_animation')
      .setOrigin(0)
      .play('deathscreen_rain_animation')

    const ratioRain = Number(this.game.config.width) / rain.width
    rain.setScale(ratioRain)
  }
}
