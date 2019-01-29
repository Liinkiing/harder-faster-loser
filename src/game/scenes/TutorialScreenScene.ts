import { scenesKeys } from '../../utils/constants'
import BaseScene from './BaseScene'
import { gameWait, wait } from '../../utils/functions'
import gameManager from '../manager/GameManager'

const SHOW_DURATION = 2500

export default class TutorialScreenScene extends BaseScene {
  constructor() {
    super({
      key: scenesKeys.TutorialScreen,
    })
  }

  public create = async () => {
    super.create()
    await gameWait(this.time, SHOW_DURATION)
    gameManager.loadNextMinigame()
  }

  public update(time: number, delta: number): void {}
}
