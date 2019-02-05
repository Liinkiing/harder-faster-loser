import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import gameStore from '../../store/GameStore'
import { randomRange } from '../../utils/functions'
import { setTimeout } from 'timers'
import { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import dataManager from '../manager/DataManager'

export default class DeathscreenScene extends BaseScene {
  private stageSet?: Phaser.GameObjects.Sprite
  private cloud?: Phaser.GameObjects.Sprite
  private rain?: Phaser.GameObjects.Sprite
  private tombstones: Phaser.GameObjects.Sprite[] = []
  private timeoutLightning?: any
  private timeoutResetLightning?: any
  private firstPartDestroyed: boolean = false
  private dataContent?: any

  constructor() {
    super({
      key: scenesKeys.Deathscreen,
    })
  }

  public create(): void {
    super.create()
    this.initFirstPart()
    this.dataContent = dataManager.pickRandomData()

    setTimeout(() => {
      this.destroyFirstPart()
    }, 2000)

    Emitter.on(GameEvents.DeathscreenFirstSceneDestroyed, args => {
      this.initSecondPart()
    })
  }

  private destroyFirstPart(): void {
    this.firstPartDestroyed = true

    clearTimeout(this.timeoutResetLightning)
    clearTimeout(this.timeoutLightning)

    this.stageSet!.destroy()
    this.cloud!.destroy()
    this.rain!.destroy()

    Emitter.emit(GameEvents.DeathscreenFirstSceneDestroyed, this.dataContent)
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
    const ROWS = 7
    const COLUMNS = 4

    const graveyardBackground = this.add
      .sprite(0, 0, 'deathscreen_graveyard_background')
      .setOrigin(0)

    const ratioGraveyardBackground =
      Number(this.game.config.width) / graveyardBackground.width
    graveyardBackground.setScale(ratioGraveyardBackground)

    const thresHoldData = ROWS * COLUMNS * (this.dataContent.percent / 100)
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLUMNS; i++) {
        if (this.tombstones.length < thresHoldData) {
          const tombe = this.add
            .sprite(0, 0, 'deathscreen_tombstones')
            .setOrigin(0)

          const ratioTombestones =
            (Number(this.game.config.width) - 25 * COLUMNS) /
            tombe.width /
            COLUMNS
          tombe.setScale(ratioTombestones)

          tombe.width = tombe.width * ratioTombestones
          tombe.height = tombe.height * ratioTombestones

          const gapX =
            (Number(this.game.config.width) - tombe.width * COLUMNS) /
            (COLUMNS + 1)
          const gapY =
            (Number(this.game.config.height) - tombe.height * ROWS) / (ROWS + 1)
          tombe.x = gapX + (gapX + tombe.width) * i
          tombe.y = gapY + (gapY + tombe.height) * j

          this.tombstones.push(tombe)
        }
      }
    }
  }
}
