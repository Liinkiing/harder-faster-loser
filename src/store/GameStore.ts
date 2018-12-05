import {action, observable} from "mobx";
import {GameState} from "../utils/enums";
import {GameSettings} from "../utils/interfaces";

class GameStore {

  @observable public state: GameState = GameState.Splashscreen
  @observable public difficulity: number = 1
  @observable public settings: GameSettings = {volume: 1}

  @action public changeState = (newState: GameState): void => {
    this.state = newState
  }

  @action public increaseDifficulty = (): void => {
    this.difficulity++
  }

}

const gameStore = new GameStore()
export default gameStore
