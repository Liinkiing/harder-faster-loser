import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import { randomRange, gameWait } from '../../utils/functions'
import gameManager, { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import dataManager from '../manager/DataManager'
import { green, lightGray, black } from '../../utils/colors'

const SOUND_RAIN = 'rain'
const SOUND_THUNDER = 'thunder'

export default class DeathscreenScene extends BaseScene {
  private stageSet?: Phaser.GameObjects.Sprite
  private cloud?: Phaser.GameObjects.Sprite
  private rain?: Phaser.GameObjects.Sprite
  private tombstones: Phaser.GameObjects.Sprite[] = []
  private firstPartDestroyed: boolean = false
  private dataContent?: any

  constructor() {
    super({
      key: scenesKeys.Deathscreen,
    })
  }

  public create = async () => {
    super.create()
    this.resetClassVariables()
    gameManager.changeBackgroundColor(lightGray)
    gameManager.audio.playAmbientMusic(SOUND_RAIN, { volume: 0.2, delay: 0.3 })
    this.initFirstPart()
    this.dataContent = dataManager.pickDataAtIndex(0)

    Emitter.on(GameEvents.DeathscreenFirstSceneDestroyed, () => {
      this.initSecondPart()
    })

    Emitter.on(GameEvents.DeathscreenThunderOn, async () => {
      if (this.stageSet && this.cloud && !this.firstPartDestroyed) {
        gameManager.changeBackgroundColor(black)
        this.stageSet.setTexture('deathscreen_stage_set_1')
        this.cloud.setTexture('deathscreen_clouds_1')

        gameManager.audio.playSfx(SOUND_THUNDER, { volume: 0.2, delay: 0.3 })

        await gameWait(this.time, 300)
        Emitter.emit(GameEvents.DeathscreenThunderOff)
      }
    })

    Emitter.on(GameEvents.DeathscreenThunderOff, () => {
      gameManager.changeBackgroundColor(lightGray)
      this.stageSet!.setTexture('deathscreen_stage_set_0')
      this.cloud!.setTexture('deathscreen_clouds_0')

      this.initLightning()
    })

    await gameWait(this.time, 8000)
    this.destroyFirstPart()
  }

  private resetClassVariables(): void {
    this.stageSet = undefined
    this.cloud = undefined
    this.rain = undefined
    this.tombstones = []
    this.firstPartDestroyed = false
    this.dataContent = null
  }

  protected destroy(): void {
    super.destroy()
    gameManager.changeBackgroundColor(green)
  }

  private destroyFirstPart(): void {
    this.firstPartDestroyed = true

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

    const ratioRain = Number(this.game.config.height) / this.rain.height
    this.rain.setScale(ratioRain)

    this.cloud = this.add.sprite(0, 0, 'deathscreen_clouds_0').setOrigin(0)

    const ratioCloud = Number(this.game.config.width) / this.cloud.width
    this.cloud.setScale(ratioCloud)

    this.initLightning()
  }

  private initLightning = async () => {
    const delayLightning = Math.floor(randomRange(2000, 8000))

    await gameWait(this.time, delayLightning)

    Emitter.emit(GameEvents.DeathscreenThunderOn)
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
        let textureKey = 'deathscreen_tombstones'
        if (this.tombstones.length > thresHoldData) {
          textureKey = 'deathscreen_empty_tombstone'
        }
        const tombstone = this.add.sprite(0, 0, textureKey).setOrigin(0)

        const ratioTombstones =
          (Number(this.game.config.width) - 25 * COLUMNS) /
          tombstone.width /
          COLUMNS
        tombstone.setScale(ratioTombstones)

        tombstone.width = tombstone.width * ratioTombstones
        tombstone.height = tombstone.height * ratioTombstones

        const gapX =
          (Number(this.game.config.width) - tombstone.width * COLUMNS) /
          (COLUMNS + 1)
        const gapY =
          (Number(this.game.config.height) - tombstone.height * ROWS) /
          (ROWS + 1)
        tombstone.x = gapX + (gapX + tombstone.width) * i
        tombstone.y = gapY + (gapY + tombstone.height) * j

        if (this.tombstones.length <= thresHoldData) {
          this.tombstones.push(tombstone)
        }
      }
    }
  }
}
