import { gameConfig } from '../../utils/game'
import gameStore from '../../store/GameStore'
import { BaseEvents, GameEvents, GameState } from '../../utils/enums'
import { scenesKeys } from '../../utils/constants'
import { EventEmitter } from 'events'
import { appear, disappear } from '../../utils/anims'

export const Emitter = new EventEmitter()

class GameManager {
  public game: Phaser.Game = new Phaser.Game(gameConfig)
  public activeScene?: Phaser.Scene
  public gameUI?: HTMLDivElement
  public gameFader?: HTMLDivElement

  constructor() {
    Emitter.on(BaseEvents.SceneInit, (scene: Phaser.Scene) => {
      this.activeScene = scene
    })
  }

  public loadSplashscreen = async () => {
    await this.startScene(scenesKeys.Splashscreen)
    gameStore.changeState(GameState.Splashscreen)
  }

  public loadHomescreen = async () => {
    await this.startScene(scenesKeys.Homescreen)
    gameStore.changeState(GameState.Homescreen)
  }

  public loadMinigame = async (minigameKey: string) => {
    await this.startScene(minigameKey)
    gameStore.changeState(GameState.Minigame)
  }

  public loadDeathscreen = async () => {
    await this.startScene(scenesKeys.Deathscreen)
  }

  public startScene = async (
    key: string,
    fade: boolean = gameConfig.fade,
    optionnalData?: any
  ) => {
    Object.keys(GameEvents).forEach(event => {
      Emitter.removeAllListeners(GameEvents[event])
    })
    console.log('STARTED ' + key)
    if (this.gameFader && fade) {
      gameStore.startTransitionning()
      await appear(this.gameFader)
      this.game.scene.scenes
        .filter(scene => scene.scene.key !== key)
        .forEach(scene => scene.scene.stop(scene.scene.key))
      this.game.scene.start(key, optionnalData)
      gameStore.changeState(key as GameState)
      gameStore.regenerateUiKey()
      gameStore.stopTransitionning()
      await disappear(this.gameFader)
      if (gameStore.paused) {
        gameStore.resume()
      }
    } else {
      this.game.scene.scenes
        .filter(scene => scene.scene.key !== key)
        .forEach(scene => scene.scene.stop(scene.scene.key))
      this.game.scene.start(key, optionnalData)
      gameStore.changeState(key as GameState)
      gameStore.regenerateUiKey()
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
    this.activeScene!.scene.resume()
    gameStore.resume()
  }

  public restartActiveScene = (
    fade: boolean = gameConfig.fade,
    data?: object
  ): void => {
    if (this.activeScene) {
      this.startScene(this.activeScene.scene.key, fade, data)
    }
  }

  public togglePause = (): void => {
    if (!this.activeScene) {
      return
    }
    if (gameStore.paused) {
      this.activeScene!.scene.resume()
      gameStore.resume()
    } else {
      this.activeScene!.scene.pause()
      gameStore.pause()
    }

    console.log('TOGGLE PAUSE')
  }
}

const gameManager = new GameManager()
export default gameManager
