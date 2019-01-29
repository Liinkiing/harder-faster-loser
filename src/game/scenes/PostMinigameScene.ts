import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import { gameWait } from '../../utils/functions'
import gameManager from '../manager/GameManager'
import gameStore from '../../store/GameStore'

const SOUND_LOST = 'hit'
const SOUND_WIN = 'success'
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
    if (gameManager.audio.ambientPlaying) {
      gameManager.audio.stopAmbientMusic()
    }
    if (gameStore.tutorial) {
      await gameWait(this.time, 1)
      gameManager.loadNextMinigame()
    } else {
      gameStore.increaseDifficulty()
      const { hasTokiJustLost, isTokiDead } = gameManager

      if (hasTokiJustLost) {
        gameManager.audio.playSfx(SOUND_LOST, { volume: 0.2, delay: 0.5 })
      } else {
        gameManager.audio.playSfx(SOUND_WIN, { volume: 0.2, delay: 0.3 })
      }

      await gameWait(this.time, DISPLAY_TIME)
      gameManager.resetTokiStatus()

      if (isTokiDead) {
        gameManager.loadLeaderboards()
      } else {
        gameManager.loadNextMinigame()
      }
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
