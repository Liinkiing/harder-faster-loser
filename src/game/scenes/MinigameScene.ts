import BaseScene from './BaseScene'
import gameManager, { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import { MinigameGuideline } from '../../utils/interfaces'

export default abstract class MinigameScene extends BaseScene {
  public abstract guideline: MinigameGuideline

  protected onSuccess(): void {
    console.log('you won')
    gameManager.loadPostMinigame()
  }

  protected onFailure(): void {
    console.log('you fail')
    gameManager.looseLife()
    gameManager.loadPostMinigame()
  }

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.RemainingTimeOver, this.onFailure)
  }
}
