import {action, observable} from "mobx";
import {GameState} from "../utils/enums";
import {GameSettings} from "../utils/interfaces";

class GameStore {

  @observable public state: GameState = GameState.Splashscreen
  @observable public difficulity: number = 1
  @observable public settings: GameSettings = {volume: 1}
  @observable public ratioResolution: number = 3

  @action public changeState = (newState: GameState): void => {
    this.state = newState
  }

  @action public increaseDifficulty = (): void => {
    this.difficulity++
  }

  @action public changeRatioResolution = (innerWidth: number): void => {
    this.ratioResolution = 2
  }

}

const gameStore = new GameStore()
export default gameStore
