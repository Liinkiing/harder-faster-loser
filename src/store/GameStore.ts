import { action, observable } from 'mobx'
import { GameState } from '../utils/enums'
import { GameSettings } from '../utils/interfaces'
import { HFLGameConfig } from '../utils/game'
import gameManager from '../game/manager/GameManager'
import { green } from '../utils/colors'

interface TokiStatus {
  hasStress: boolean
  hasJustStress: boolean
  hasBrain: boolean
  hasJustBrain: boolean
  hasHeart: boolean
  hasJustHeart: boolean
}

class GameStore {
  @observable public state: GameState = GameState.Splashscreen
  @observable public difficulty: number = 1
  @observable public loading: boolean = true
  @observable public started: boolean = false
  @observable public status: TokiStatus = {
    hasStress: false,
    hasBrain: true,
    hasHeart: true,
    hasJustStress: false,
    hasJustBrain: false,
    hasJustHeart: false,
  }

  @observable public elapsed: number = 0
  @observable public paused: boolean = false
  @observable public settings: GameSettings = { volume: 1 }
  @observable public config: HFLGameConfig = {
    dev: process.env.NODE_ENV === 'development',
    suspended: false,
    fade: true,
    fadeColor: green,
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

  @action public startGame = (): void => {
    this.started = true
  }

  @action public stopGame = (): void => {
    this.started = false
  }

  @action public regenerateUiKey = (): void => {
    this.uiKey = new Phaser.Math.RandomDataGenerator().uuid()
  }

  @action public changeSettings = (
    newSettings: Partial<GameSettings>
  ): void => {
    this.settings = { ...this.settings, ...newSettings }
  }

  @action public changeConfig = (newConfig: Partial<HFLGameConfig>): void => {
    this.config = { ...this.config, ...newConfig }
    if (newConfig.backgroundColor) {
      gameManager.changeBackgroundColor(this.config.backgroundColor)
    }
  }

  @action public looseLife = (): void => {
    if (!this.status.hasStress) {
      this.status.hasStress = true
      this.status.hasJustStress = true
      this.status.hasJustBrain = false
      this.status.hasJustHeart = false
      this.status.hasJustStress = true
    } else if (this.status.hasBrain) {
      this.status.hasBrain = false
      this.status.hasJustStress = false
      this.status.hasJustBrain = true
      this.status.hasJustHeart = false
    } else if (this.status.hasHeart) {
      this.status.hasHeart = false
      this.status.hasJustStress = false
      this.status.hasJustBrain = false
      this.status.hasJustHeart = true
    }
  }

  @action public startLoading = (): void => {
    this.loading = true
  }

  @action public stopLoading = (): void => {
    this.loading = false
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

  @action public resetTokiStatus = (): void => {
    this.status.hasJustStress = false
    this.status.hasJustBrain = false
    this.status.hasJustHeart = false
  }

  get hasStress() {
    return this.status.hasStress
  }

  get hasLoosedBrain() {
    return !this.status.hasBrain
  }

  get hasLoosedHeart() {
    return !this.status.hasHeart
  }

  get hasJustStress() {
    return this.status.hasJustStress
  }

  get hasJustLoosedBrain() {
    return this.status.hasJustBrain
  }

  get hasJustLoosedHeart() {
    return this.status.hasJustHeart
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
