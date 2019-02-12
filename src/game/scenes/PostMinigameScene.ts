import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import { gameWait } from '../../utils/functions'
import gameManager from '../manager/GameManager'
import gameStore from '../../store/GameStore'
import { green } from '../../utils/colors'

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
    gameStore.changeConfig({
      backgroundColor: green,
    })
    this.createFillerGraphics()
    if (gameManager.audio.ambientPlaying) {
      gameManager.audio.stopAmbientMusic()
    }
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
      gameManager.loadDeathscreen()
    } else {
      gameManager.loadNextMinigame()
    }
  }
}
