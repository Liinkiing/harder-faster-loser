import BaseScene from './BaseScene'
import gameManager, { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'
import { MinigameGuideline } from '../../utils/interfaces'
import gameStore from '../../store/GameStore'
import minigameManager from '../manager/MinigameManager'
import { List } from '../../utils/extensions'
import { green } from '../../utils/colors'

export default abstract class MinigameScene extends BaseScene {
  public abstract guideline: MinigameGuideline
  protected availableBackgroundColors: List<string> = new List([green])
  protected hasActionIndicators = false
  protected actionIndicator?: Phaser.GameObjects.Sprite

  public create(): void {
    super.create()
    gameStore.changeConfig({
      backgroundColor: this.availableBackgroundColors.random(),
    })
    gameStore.regenerateUiKey()
    if (this.hasActionIndicators) {
      gameManager.suspendMinigame()
      this.actionIndicator = this.add.sprite(0, 0, '')
      this.configureActionIndicator()
    } else {
      gameManager.resumeMinigame()
    }
  }

  protected configureActionIndicator = (): void => {}

  protected destroyActionIndicator = (): void => {
    if (this.hasActionIndicators && this.actionIndicator) {
      gameManager.resumeMinigame()
      this.actionIndicator.destroy()
      this.hasActionIndicators = false
    }
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
