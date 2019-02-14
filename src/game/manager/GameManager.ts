import { gameConfig, HFLGameConfig } from '../../utils/game'
import gameStore from '../../store/GameStore'
import { BaseEvents, GameEvents, GameState } from '../../utils/enums'
import { minigameSuffix, scenesKeys } from '../../utils/constants'
import { EventEmitter } from 'events'
import { appear, disappear } from '../../utils/anims'
import { GameBackgroundColor } from '../../utils/types'
import { gameBackgroundColorToCss, wait } from '../../utils/functions'
import minigameManager from './MinigameManager'
import AudioManager from './AudioManager'
import { MinigameGuideline } from '../../utils/interfaces'
import MinigameScene from '../scenes/MinigameScene'
import { BootScene } from '../scenes'
import gameDebugStore from '../../store/GameDebugStore'
import BaseScene from '../scenes/BaseScene'

export const Emitter = new EventEmitter()

export class GameManager {
  public game: Phaser.Game = new Phaser.Game(gameConfig)
  public audio: AudioManager = new AudioManager(this)
  public activeScene?: Phaser.Scene
  public gameUI?: HTMLDivElement
  public gameFader?: HTMLDivElement

  constructor() {
    Emitter.on(BaseEvents.SceneInit, (scene: Phaser.Scene) => {
      this.activeScene = scene
    })
    if (this.isDesktop) {
      console.log(document.querySelector('canvas'))
      wait(1000).then(() => {
        const canvas = document.querySelector('canvas')
        if (canvas) {
          canvas.remove()
        }
      })
    }
  }

  public get isDesktop() {
    return this.game.device.os.desktop
  }

  public get minigameGuideline(): MinigameGuideline {
    if (gameStore.state === GameState.Minigame && this.activeScene) {
      return (this.activeScene as MinigameScene).guideline
    } else {
      throw new Error(
        'Could not get minigame guideline. Are you trying to access it outside a Minigame?'
      )
    }
  }

  public get canVibrate() {
    return !this.isDesktop && window.navigator.vibrate !== undefined
  }

  public suspendMinigame = (): void => {
    gameStore.changeConfig({
      suspended: true,
    })
  }

  public resumeMinigame = (): void => {
    gameStore.changeConfig({
      suspended: false,
    })
  }

  public vibrate = (pattern: number | number[] = 10): boolean => {
    const {
      settings: { vibrations },
    } = gameStore
    if (!vibrations || !this.canVibrate) {
      return false
    }
    return window.navigator.vibrate(pattern)
  }

  public startGame = (): void => {
    ;(this.game.scene.getScene(scenesKeys.Boot) as BootScene).startGame()
  }

  public resizeCamera = (width: number, height: number): void => {
    this.activeScene!.cameras.resize(width, height)
  }

  public loadSplashscreen = async () => {
    await this.startScene(scenesKeys.Splashscreen)
    gameStore.changeState(GameState.Splashscreen)
  }

  public loadHomescreen = async () => {
    await this.startScene(scenesKeys.Homescreen)
    gameStore.changeState(GameState.Homescreen)
  }

  public loadIntroduction = async () => {
    await this.startScene(scenesKeys.Introduction)
    gameStore.changeState(GameState.Introduction)
  }

  public loadMinigame = async (minigameKey: string) => {
    gameManager.suspendMinigame()
    await minigameManager.startGame(minigameKey)
  }

  public forceLoadMinigame = async (minigameKey: string) => {
    gameManager.suspendMinigame()
    await minigameManager.startGame(minigameKey, true)
  }

  public loadNextMinigame = async () => {
    gameManager.suspendMinigame()
    await this.startScene(minigameManager.pickNextGameKey())
  }

  public loadPostMinigame = async () => {
    gameManager.suspendMinigame()
    await this.startScene(scenesKeys.PostMinigameScene)
  }

  public loadDeathscreen = async () => {
    await this.startScene(scenesKeys.Deathscreen)
  }

  public loadLeaderboards = async () => {
    await this.startScene(scenesKeys.Leaderboards)
  }

  public startScene = async (
    key: string,
    config: HFLGameConfig = gameStore.config,
    optionnalData?: any
  ) => {
    Object.keys(GameEvents).forEach(event => {
      Emitter.removeAllListeners(GameEvents[event])
    })
    if (this.gameFader && config.fade) {
      gameStore.startTransitionning()
      await appear(this.gameFader)
      this.game.scene.scenes
        .filter(scene => scene.scene.key !== key)
        .forEach(scene => {
          if (scene.scene.key === this.activeScene!.scene.key) {
            ;(this.activeScene! as BaseScene).destroy()
            // Emitter.emit(BaseEvents.SceneDestroyed)
          }
          scene.scene.stop(scene.scene.key)
        })
      gameManager.resumeMinigame()
      this.game.scene.start(key, optionnalData)
      gameStore.changeState(
        key.includes(minigameSuffix) ? GameState.Minigame : (key as GameState)
      )
      gameStore.stopTransitionning()
      await disappear(this.gameFader)
      if (gameStore.paused) {
        gameStore.resume()
      }
    } else {
      this.game.scene.scenes
        .filter(scene => scene.scene.key !== key)
        .forEach(scene => scene.scene.stop(scene.scene.key))
      gameStore.startTransitionning()
      gameManager.resumeMinigame()
      this.game.scene.start(key, optionnalData)
      gameStore.stopTransitionning()
      gameStore.changeState(
        key.includes(minigameSuffix) ? GameState.Minigame : (key as GameState)
      )
      if (gameStore.paused) {
        gameStore.resume()
      }
    }
  }

  public pause = (): void => {
    if (!this.activeScene) {
      return
    }
    this.activeScene!.scene.pause()
    gameStore.pause()
  }

  public resume = (): void => {
    if (!this.activeScene) {
      return
    }
    this.audio.untuneBg()
    this.activeScene!.scene.resume()
    gameStore.resume()
  }

  public changeBackgroundColor = (color: GameBackgroundColor): void => {
    if (this.activeScene) {
      this.activeScene.cameras.main.setBackgroundColor(
        gameBackgroundColorToCss(color)
      )
    }
  }

  public restartActiveScene = async (
    config: HFLGameConfig = gameStore.config,
    data?: object
  ) => {
    if (this.activeScene) {
      await this.startScene(this.activeScene.scene.key, config, data)
    }
  }

  public togglePause = (): void => {
    if (!this.activeScene || !gameStore.canPause) {
      return
    }
    if (gameStore.paused) {
      this.resume()
    } else {
      this.pause()
    }
  }

  public toggleDebugPause = (): void => {
    if (!this.activeScene) {
      return
    }
    if (gameDebugStore.paused) {
      this.activeScene!.scene.resume()
      gameDebugStore.resume()
    } else {
      this.activeScene!.scene.pause()
      gameDebugStore.pause()
    }
  }

  get hasTokiJustLost(): boolean {
    return (
      gameStore.hasJustLoosedBrain ||
      gameStore.hasJustLoosedHeart ||
      gameStore.hasJustStress
    )
  }

  public restartGame = async () => {
    await this.loadHomescreen()
    gameStore.resetGame()
  }

  public resetTokiStatus = (): void => {
    gameStore.resetTokiStatus()
  }

  public looseLife = (): void => {
    gameStore.looseLife()
  }

  get isTokiDead() {
    return !gameStore.status.hasHeart
  }
}

const gameManager = new GameManager()
export default gameManager
