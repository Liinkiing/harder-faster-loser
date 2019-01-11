import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import { gameWait } from '../../utils/functions'
import gameManager from '../manager/GameManager'

const SOUND_LOST = 'hit'
const DISPLAY_TIME = 3000

export default class PostMinigameScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.PostMinigameScene,
    })
  }

  public create = async () => {
    super.create()
    this.createFillerGraphics()
    const { hasTokiJustLost, isTokiDead } = gameManager

    if (hasTokiJustLost) {
      gameWait(this.time, 700).then(() => {
        gameManager.audio.playSfx(SOUND_LOST, { volume: 0.2 })
      })
    }

    await gameWait(this.time, DISPLAY_TIME)
    gameManager.resetTokiStatus()

    if (isTokiDead) {
      gameManager.loadDeathscreen()
    } else {
      gameManager.loadNextMinigame()
    }
  }

  private createFillerGraphics = (): void => {
    const graphics = this.add.graphics()
    graphics.fillStyle(0xff3300, 0)
    graphics.fillRect(100, 200, 600, 300)
    graphics.fillRect(100, 100, 100, 100)
    this.add.text(-100, -100, this.scene.key)
  }
}
