import {gameConfig} from "../../utils/game";
import gameStore from "../../store/GameStore";
import {GameState} from "../../utils/enums";
import {scenesKeys} from "../../utils/constants";

class GameManager {

  public game: Phaser.Game = new Phaser.Game(gameConfig)

  public loadMinigame = (minigameKey: string): void => {
    this.game.scene.start(minigameKey)
    gameStore.changeState(GameState.Minigame)
  }

  public loadSplashscreen = (): void => {
    this.game.scene.start(scenesKeys.Splashscreen)
    gameStore.changeState(GameState.Splashscreen)
  }

}

const gameManager = new GameManager()
export default gameManager
