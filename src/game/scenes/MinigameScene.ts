import BaseScene from './BaseScene'
import { Emitter } from '../manager/GameManager'
import { GameEvents } from '../../utils/enums'

export default abstract class MinigameScene extends BaseScene {
  public abstract onSuccess(): void

  public abstract onFailure(): void

  protected initListeners(): void {
    super.initListeners()
    Emitter.on(GameEvents.RemainingTimeOver, this.onFailure)
  }
}
