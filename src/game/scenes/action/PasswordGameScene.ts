import { scenesKeys } from '../../../utils/constants'
import gameManager, { Emitter } from '../../manager/GameManager'
import MinigameScene from '../MinigameScene'

export default class PasswordGameScene extends MinigameScene {
  constructor() {
    super({
      key: scenesKeys.PasswordMinigame,
    })
  }

  public onFailure = (): void => {
    console.log('you failed')
    gameManager.loadNextMinigame()
  }

  public onSuccess = (): void => {}

  public update = (time: number, delta: number): void => {}
}
