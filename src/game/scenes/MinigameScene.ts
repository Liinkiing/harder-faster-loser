import BaseScene from './BaseScene'
import gameManager, { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import { MinigameGuideline } from '../../utils/interfaces'
import gameStore from '../../store/GameStore'
import minigameManager from '../manager/MinigameManager'

export default abstract class MinigameScene extends BaseScene {
  public abstract guideline: MinigameGuideline

  public create(): void {
    super.create()
    gameStore.regenerateUiKey()
  }

  protected onSuccess(): void {
    Emitter.emit(GameEvents.MinigameSuccess)
    minigameManager.addCurrentMinigameToPlayedGames()
    gameManager.loadPostMinigame()
  }

  protected onFailure(): void {
    Emitter.emit(GameEvents.MinigameFailure)
    minigameManager.addCurrentMinigameToPlayedGames()
    gameManager.looseLife()
    gameManager.loadPostMinigame()
  }

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.RemainingTimeOver, this.onFailure)
  }
}
