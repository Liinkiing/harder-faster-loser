import {gameConfig} from "../../utils/game";
import gameStore from "../../store/GameStore";
import {BaseEvents, GameEvents, GameState} from "../../utils/enums";
import {scenesKeys} from "../../utils/constants";
import {EventEmitter} from "events";

export const Emitter = new EventEmitter()

class GameManager {
  public game: Phaser.Game = new Phaser.Game(gameConfig)
  public activeScene?: Phaser.Scene

  constructor() {
    Emitter.on(BaseEvents.SceneCreated, (scene: Phaser.Scene) => {
      this.activeScene = scene
    })
  }

  public loadSplashscreen = (): void => {
    this.startScene(scenesKeys.Splashscreen)
    gameStore.changeState(GameState.Splashscreen)
  }

  public loadHomescreen = (): void => {
    this.startScene(scenesKeys.Homescreen)
    gameStore.changeState(GameState.Homescreen)
  }

  public loadMinigame = (minigameKey: string): void => {
    this.startScene(minigameKey)
    gameStore.changeState(GameState.Minigame)
  }

  public loadDeathscreen = (): void => {
    this.startScene(scenesKeys.Deathscreen)
    gameStore.changeState(GameState.Deathscreen)
  }

  public startScene = (key: string, optionnalData?: any): void => {
    this.game.scene.scenes
      .filter(scene => scene.scene.key !== key)
      .forEach(scene => scene.scene.stop(scene.scene.key))
    Object.keys(GameEvents).forEach(event => { Emitter.removeAllListeners(GameEvents[event]) })
    console.log('STARTED ' + key)
    this.game.scene.start(key, optionnalData)
    gameStore.resume()
    gameStore.changeState(key as GameState)
  }

  public pause = (): void => {
    this.activeScene!.scene.pause()
    gameStore.pause()
  }

  public resume = (): void => {
    this.activeScene!.scene.resume()
    gameStore.resume()
  }

  public togglePause = (): void => {
    if (gameStore.paused) {
      this.activeScene!.scene.resume()
    } else {
      this.activeScene!.scene.pause()
    }

    console.log('TOGGLE PAUSE')
    gameStore.togglePause()
  }

}

const gameManager = new GameManager()
export default gameManager
