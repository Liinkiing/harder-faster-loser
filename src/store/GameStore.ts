import { action, observable } from 'mobx'
import { GameState } from '../utils/enums'
import { GameSettings } from '../utils/interfaces'
import { HFLGameConfig } from '../utils/game'
import gameManager from '../game/manager/GameManager'
import { green } from '../utils/colors'

class GameStore {
  @observable public state: GameState = GameState.Splashscreen
  @observable public difficulty: number = 1
  @observable public lives: number = 3
  @observable public elapsed: number = 0
  @observable public paused: boolean = false
  @observable public settings: GameSettings = { volume: 1 }
  @observable public config: HFLGameConfig = {
    suspended: false,
    fade: false,
    fadeColor: 'black',
    backgroundColor: green,
    minigameDuration: 500,
  }
  @observable public ratioResolution: number = 3
  @observable public transitionning: boolean = false
  @observable
  public uiKey: string = new Phaser.Math.RandomDataGenerator().uuid()

  @action public increaseElapsed = (delta: number = 1): void => {
    this.elapsed += delta
  }

  @action public regenerateUiKey = (): void => {
    this.uiKey = new Phaser.Math.RandomDataGenerator().uuid()
  }

  @action public changeConfig = (newConfig: Partial<HFLGameConfig>): void => {
    this.config = { ...this.config, ...newConfig }
    if (newConfig.backgroundColor) {
      gameManager.changeBackgroundColor(this.config.backgroundColor)
    }
  }

  public decreaseLife = (step: number = 1): void => {
    this.lives -= step
  }

  @action public changeState = (newState: GameState): void => {
    this.state = newState
  }

  @action public increaseDifficulty = (step: number = 0.5): void => {
    this.difficulty += step
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

  get secondsElapsed() {
    return (this.elapsed / 1000) * 16
  }

  get timeElapsed() {
    return new Date(this.secondsElapsed * 1000).toLocaleTimeString('fr', {
      minute: '2-digit',
      second: '2-digit',
    })
  }
}

const gameStore = new GameStore()
export default gameStore
