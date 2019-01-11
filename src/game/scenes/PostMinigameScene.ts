import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import { gameWait } from '../../utils/functions'
import gameManager from '../manager/GameManager'

const DISPLAY_TIME = 3000

export default class PostMinigameScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.PostMinigameScene,
    })
  }

  public create = async () => {
    super.create()
    const graphics = this.add.graphics()
    graphics.fillStyle(0xff3300, 0)
    graphics.fillRect(100, 200, 600, 300)
    graphics.fillRect(100, 100, 100, 100)
    this.add.text(-100, -100, this.scene.key)
    await gameWait(this.time, DISPLAY_TIME)
    gameManager.resetTokiStatus()
    gameManager.loadNextMinigame()
  }
}
