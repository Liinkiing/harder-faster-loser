import { action, observable } from 'mobx'
import { GameState } from '../utils/enums'
import { GameSettings } from '../utils/interfaces'

class GameStore {
  @observable public state: GameState = GameState.Splashscreen
  @observable public difficulity: number = 1
  @observable public paused: boolean = false
  @observable public settings: GameSettings = { volume: 1 }
  @observable public ratioResolution: number = 3
  @observable public transitionning: boolean = false
  @observable
  public uiKey: string = new Phaser.Math.RandomDataGenerator().uuid()

  @action public regenerateUiKey = (): void => {
    this.uiKey = new Phaser.Math.RandomDataGenerator().uuid()
  }

  @action public changeState = (newState: GameState): void => {
    this.state = newState
  }

  @action public increaseDifficulty = (): void => {
    this.difficulity++
  }

  @action public changeRatioResolution = (innerWidth: number): void => {
    this.ratioResolution = 2
  }

  @action public togglePause = (): void => {
    if (this.transitionning) {
      return
    }
    this.paused = !this.paused
  }

  @action public pause = (): void => {
    if (this.transitionning) {
      return
    }
    this.paused = true
  }

  @action public resume = (): void => {
    if (this.transitionning) {
      return
    }
    this.paused = false
  }

  @action public startTransitionning = (): void => {
    this.transitionning = true
  }

  @action public stopTransitionning = (): void => {
    this.transitionning = false
  }

  @action public toggleTransition = (): void => {
    this.transitionning = !this.transitionning
  }
}

const gameStore = new GameStore()
export default gameStore
