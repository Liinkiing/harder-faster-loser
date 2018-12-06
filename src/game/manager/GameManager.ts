import {gameConfig} from "../../utils/game";
import gameStore from "../../store/GameStore";
import {GameState} from "../../utils/enums";
import {scenesKeys} from "../../utils/constants";

class GameManager {

  public game: Phaser.Game = new Phaser.Game(gameConfig)

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

    console.log('STARTED ' + key)
    this.game.scene.start(key, optionnalData)
    gameStore.changeState(key as GameState)
  }

}

const gameManager = new GameManager()
export default gameManager
