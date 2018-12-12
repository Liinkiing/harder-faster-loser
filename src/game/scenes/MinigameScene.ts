import BaseScene from './BaseScene'

export default abstract class MinigameScene extends BaseScene {
  public abstract onSuccess(): void

  public abstract onFailure(): void
}
