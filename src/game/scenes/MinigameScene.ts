import BaseScene from './BaseScene'
import gameManager, { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import { MinigameGuideline } from '../../utils/interfaces'
import gameStore from '../../store/GameStore'

export default abstract class MinigameScene extends BaseScene {
  public abstract guideline: MinigameGuideline

  public create(): void {
    super.create()
    gameStore.regenerateUiKey()
  }

  protected onSuccess(): void {
    console.log('you won')
    gameManager.loadPostMinigame()
  }

  protected onFailure(): void {
    console.log('you fail')
    gameManager.loadPostMinigame()
  }

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.RemainingTimeOver, this.onFailure)
  }
}
