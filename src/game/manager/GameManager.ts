import {gameConfig} from "../../utils/game";
import gameStore from "../../store/GameStore";
import {BaseEvents, GameEvents, GameState} from "../../utils/enums";
import {scenesKeys} from "../../utils/constants";
import {EventEmitter} from "events";
import {appear, disappear} from "../../utils/anims";

export const Emitter = new EventEmitter()

class GameManager {
  public game: Phaser.Game = new Phaser.Game(gameConfig)
  public activeScene?: Phaser.Scene
  public gameUI?: HTMLDivElement
  public gameFader?: HTMLDivElement

  constructor() {
    Emitter.on(BaseEvents.SceneCreated, (scene: Phaser.Scene) => {
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
    gameStore.changeState(GameState.Deathscreen)
  }

  public startScene = async (key: string, optionnalData?: any) => {
    this.game.scene.scenes
      .filter(scene => scene.scene.key !== key)
      .forEach(scene => scene.scene.stop(scene.scene.key))
    Object.keys(GameEvents).forEach(event => { Emitter.removeAllListeners(GameEvents[event]) })
    console.log('STARTED ' + key)
    if(this.gameFader) {
      gameStore.startTransitionning()
      await appear(this.gameFader)
      this.game.scene.start(key, optionnalData)
      gameStore.changeState(key as GameState)
      await disappear(this.gameFader)
      gameStore.stopTransitionning()
      gameStore.resume()
    } else {
      this.game.scene.start(key, optionnalData)
      gameStore.resume()
      gameStore.changeState(key as GameState)
    }

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
