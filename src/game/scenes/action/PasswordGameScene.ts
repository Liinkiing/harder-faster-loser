import { scenesKeys } from '../../../utils/constants'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'
import gameStore from '../../../store/GameStore'
import KeyboardContainer from '../../objects/password-game/KeyboardContainer'

export default class PasswordGameScene extends MinigameScene {
  private keyboard?: KeyboardContainer
  constructor() {
    super({
      key: scenesKeys.PasswordMinigame,
    })
  }

  public create = (): void => {
    super.create()
    this.keyboard = new KeyboardContainer({
      scene: this,
      y: 0,
      x: 20 / gameStore.ratioResolution,
    })
  }

  public onFailure = (): void => {
    console.log('you failed')
    gameManager.restartActiveScene()
  }

  public onSuccess = (): void => {}

  public update = (time: number, delta: number): void => {}
}
