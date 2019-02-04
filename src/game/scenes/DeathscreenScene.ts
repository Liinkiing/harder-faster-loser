import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { randomRange } from '../../utils/functions'
import { setTimeout } from 'timers'
import { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'

export default class DeathscreenScene extends BaseScene {
  private stageSet?: Phaser.GameObjects.Sprite
  private cloud?: Phaser.GameObjects.Sprite
  private rain?: Phaser.GameObjects.Sprite
  private tombstones?: Phaser.GameObjects.Sprite
  private timeoutLightning?: any
  private timeoutResetLightning?: any
  private firstPartDestroyed: boolean = false

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

    Emitter.on(GameEvents.DeathscreenFirstSceneDestroyed, () => {
      this.initSecondPart()
    })
  }

  private destroyFirstPart(): void {
    this.firstPartDestroyed = true

    // Destroy timeout
    clearTimeout(this.timeoutResetLightning)
    clearTimeout(this.timeoutLightning)

    // Destroy sprites
    this.stageSet!.destroy()
    this.cloud!.destroy()
    this.rain!.destroy()

    Emitter.emit(GameEvents.DeathscreenFirstSceneDestroyed, this)
  }

  private initFirstPart(): void {
    this.stageSet = this.add
      .sprite(0, 0, 'deathscreen_stage_set_0')
      .setOrigin(0)

    const ratioStageSet = Number(this.game.config.width) / this.stageSet.width
    this.stageSet.setScale(ratioStageSet)

    this.rain = this.add
      .sprite(0, 0, 'deathscreen_rain_animation')
      .setOrigin(0)
      .play('deathscreen_rain_animation')

    const ratioRain = Number(this.game.config.width) / this.rain.width
    this.rain.setScale(ratioRain)

    this.cloud = this.add.sprite(0, 0, 'deathscreen_clouds_0').setOrigin(0)

    const ratioCloud = Number(this.game.config.width) / this.cloud.width
    this.cloud.setScale(ratioCloud)

    this.initLightning()
  }

  private initLightning(): void {
    const delayLightning = Math.floor(randomRange(3000, 4000))
    this.timeoutLightning = setTimeout(() => {
      if (this.stageSet && this.cloud && !this.firstPartDestroyed) {
        this.stageSet.setTexture('deathscreen_stage_set_1')
        this.cloud.setTexture('deathscreen_clouds_1')

        this.timeoutResetLightning = setTimeout(() => {
          this.stageSet!.setTexture('deathscreen_stage_set_0')
          this.cloud!.setTexture('deathscreen_clouds_0')

          this.initLightning()
        }, 300)
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
