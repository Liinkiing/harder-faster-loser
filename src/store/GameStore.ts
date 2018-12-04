import {action, observable} from "mobx";
import {GameState} from "../utils/enums";
import {GameSettings} from "../utils/interfaces";

class GameStore {

  @observable public state: GameState = GameState.Splashscreen
  @observable public debug: boolean = false
  @observable public settings: GameSettings = {volume: 1}

  @action public changeState = (newState: GameState): void => {
    this.state = newState
  }

  @action public showDebug = (): void => {
    this.debug = true
  }

  @action public hideDebug = (): void => {
    this.debug = false
  }

}

const gameStore = new GameStore()
export default gameStore
