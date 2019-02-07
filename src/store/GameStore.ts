import { action, observable, reaction } from 'mobx'
import { GameState } from '../utils/enums'
import { GameSettings } from '../utils/interfaces'
import { HFLGameConfig } from '../utils/game'
import gameManager from '../game/manager/GameManager'
import { green } from '../utils/colors'
import HFLApiClient from '../client/HFLApiClient'

interface TokiStatus {
  hasStress: boolean
  hasJustStress: boolean
  hasBrain: boolean
  hasJustBrain: boolean
  hasHeart: boolean
  hasJustHeart: boolean
}

const LS_GAME_SETTINGS = 'settings'

const MINIGAME_DURATION = 500
const REMAINING_PAUSE = 10

const PAUSE_MIN_THRESHOLD = 0.2

class GameStore {
  @observable public state: GameState = GameState.Splashscreen
  @observable public difficulty: number = 1
  @observable public loading: boolean = true
  @observable public showingGuideline: boolean = false
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
  @observable public score = {
    previous: 0,
    current: 0,
  }
  @observable public paused: boolean = false
  @observable public settings: GameSettings = { volume: 1, vibrations: true }
  @observable public config: HFLGameConfig = {
    dev: process.env.NODE_ENV === 'development',
    suspended: false,
    fade: true,
    remainingPause: REMAINING_PAUSE,
    fadeColor: green,
    backgroundColor: green,
    minigameDuration: MINIGAME_DURATION,
  }
  @observable public ratioResolution: number = 3
  @observable public transitionning: boolean = false
  @observable
  public uiKey: string = new Phaser.Math.RandomDataGenerator().uuid()

  constructor(private client: HFLApiClient) {
    if (!window.localStorage.getItem(LS_GAME_SETTINGS)) {
      window.localStorage.setItem(
        LS_GAME_SETTINGS,
        JSON.stringify(this.settings)
      )
    }
    this.settings = JSON.parse(window.localStorage.getItem(LS_GAME_SETTINGS)!)
    reaction(
      () => this.settings,
      settings => {
        window.localStorage.setItem(LS_GAME_SETTINGS, JSON.stringify(settings))
        gameManager.audio.volume = settings.volume
      }
    )
    reaction(
      () => this.difficulty,
      difficulty => {
        const computed = difficulty / 3.2
        gameManager.audio.detuneBg = computed * 125
        const duration = Math.exp(computed) + 500 - Math.exp(computed) * 2
        this.changeConfig({
          minigameDuration: Phaser.Math.Clamp(duration, 25, 500),
        })
      }
    )
    reaction(
      () => this.paused,
      paused => {
        if (paused) {
          gameManager.audio.detuneBg = -1200
        } else {
          gameManager.audio.untuneBg()
        }
      }
    )
  }

  @action public resetGame = (): void => {
    this.changeConfig({
      minigameDuration: MINIGAME_DURATION,
      remainingPause: REMAINING_PAUSE,
      suspended: false,
    })
    this.elapsed = 0
    this.score = { previous: 0, current: 0 }
    this.status = {
      hasStress: false,
      hasBrain: true,
      hasHeart: true,
      hasJustStress: false,
      hasJustBrain: false,
      hasJustHeart: false,
    }
    this.difficulty = 1
    this.startGame()
  }

  @action public showGuideline = (): void => {
    this.showingGuideline = true
  }

  @action public hideGuideline = (): void => {
    this.showingGuideline = false
  }

  @action public decreasePauseRemaining = (): void => {
    if (this.config.remainingPause <= 0.02) {
      return
    }
    this.config.remainingPause -= 0.02
  }

  @action public increaseElapsed = (delta: number = 1): void => {
    this.elapsed += delta
  }

  @action public addToScore = (score: number): void => {
    this.score.previous = this.score.current
    this.score.current += score
  }

  @action public startGame = (): void => {
    this.started = true
    // Just used to make sure we call the API on start game to wake up my free Heroku dyno
    this.client.checkStatus()
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

  @action public increaseDifficulty = (step: number = 1): void => {
    this.difficulty = Phaser.Math.Clamp(this.difficulty + step, 1, 20)
  }

  @action public setDifficulty = (difficulty: number): void => {
    this.difficulty = Phaser.Math.Clamp(difficulty, 1, 20)
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

  get canPause() {
    return this.config.remainingPause >= PAUSE_MIN_THRESHOLD
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

  public getTimeElapsedForSeconds = (seconds: number): string =>
    new Date(seconds * 1000).toLocaleTimeString('fr', {
      minute: '2-digit',
      second: '2-digit',
    })
}

const gameStore = new GameStore(new HFLApiClient())
export default gameStore
